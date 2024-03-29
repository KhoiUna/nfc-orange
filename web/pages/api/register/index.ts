import type { NextApiRequest, NextApiResponse } from "next";
import Joi from "joi";
import { RegisterInfo } from "../../register";
import client from "../../../db/client";
import PasswordHelper from "../../../helpers/PasswordHelper";

type ApiResponse = {
  success: boolean | string
  error: boolean | string
};

type Body = {
  username: string
  first_name: string
  middle_name: string
  last_name: string
  email: string
  major: string
  expected_grad_date: string
  password: string
}

const isValid = async (registerInfo: RegisterInfo) => {
  const schema = Joi.object().keys({
    first_name: Joi.string().trim().min(1).required(),
    middle_name: Joi.string().trim().allow(null, ""),
    last_name: Joi.string().trim().min(1).required(),
    email: Joi.string().email().trim().required(),
    major: Joi.string().min(2).max(45).required(),
    expected_grad_date: Joi.string().required(),
    username: Joi.string().trim().min(3).alphanum().required(),
    password: Joi.string().min(6).required(),
    confirm_password: Joi.ref("password"),
  });

  try {
    const _ = await schema.validateAsync(registerInfo)
  } catch (error: any) {
    if (error.details[0].type === "any.only")
      return {
        success: false,
        error: "Confirm password does not match",
      };

    return { success: false, error: error.details[0].message };
  }

  return { success: true, error: false };
};

const isEduEmail = (email: string) => {
  let array = email.split('@')
  const domain = array[array.length - 1]

  array = domain.split('.')
  const topLevelDomain = array[array.length - 1]

  return topLevelDomain === 'edu'
}

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  try {
    if (req.method !== "POST")
      return res
        .status(405)
        .json({ success: false, error: "Method not allowed" });

    const { first_name, middle_name, last_name, email, major, expected_grad_date, username, password }: Body =
      req.body;
    const { c_id } = req.query;

    // Validate email (has to be school email with `.edu`)
    // if (!isEduEmail(email)) return res.status(400).json({ success: false, error: 'Please use a .edu email' });

    // Validate req.body from user
    const { error } = await isValid(req.body);
    if (error) return res.status(400).json({ success: false, error });

    // Validate card id c_id
    if (!c_id)
      return res
        .status(400)
        .json({ success: false, error: "Invalid registration" });

    const { rows: cards } = await client.query(
      "SELECT * FROM cards WHERE uuid = $1;",
      [c_id]
    );
    const cardId = cards[0].id;

    if (cards.length !== 1)
      return res
        .status(400)
        .json({ success: false, error: "Invalid registration" });

    // Validate that card is not registered
    const { rows: registeredUser } = await client.query('SELECT * FROM users WHERE card_id=$1', [cardId])
    if (registeredUser.length > 0)
      return res
        .status(400)
        .json({ success: false, error: "Invalid registration" });

    // Validate unique email
    const { rows: users } = await client.query(
      "SELECT * FROM users WHERE email = $1;",
      [email]
    );
    if (users.length !== 0)
      return res
        .status(400)
        .json({ success: false, error: "Email already registered" })

    // Validate unique username
    const { rows } = await client.query(
      "SELECT COUNT(*) FROM users WHERE username = $1;",
      [username]
    );
    const { count } = rows[0]
    if (count > 0) return res
      .status(400)
      .json({ success: false, error: "Username already exists" })


    // Save user to db
    const savingUserResponse = await client.query(
      "INSERT INTO users(email, password, card_id, first_name, middle_name, last_name, major, expected_grad_date, username) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
      [
        email,
        await PasswordHelper.hashPassword(password),
        cardId,
        first_name.trim(),
        middle_name.trim(),
        last_name.trim(),
        major,
        expected_grad_date,
        username
      ]
    );

    if (!savingUserResponse) throw new Error("Error creating user");

    return res
      .status(200)
      .json({ success: "Registered successfully", error: false });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
}
