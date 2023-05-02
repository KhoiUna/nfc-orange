import type { NextApiRequest, NextApiResponse } from "next";
import Joi from "joi";
import { RegisterInfo } from "../register";
import client from "../../db/client";
import PasswordHelper from "../../helpers/PasswordHelper";

export type ApiResponse = {
  success: any;
  error: any;
};

type Body = {
  first_name: string
  middle_name: string
  last_name: string
  email: string
  major: string
  password: string
}

const isValid = async (registerInfo: RegisterInfo) => {
  const schema = Joi.object().keys({
    first_name: Joi.string().trim().min(1).required(),
    middle_name: Joi.string().trim().allow(null, ""),
    last_name: Joi.string().trim().min(1).required(),
    email: Joi.string().email().trim().required(),
    major: Joi.string().min(5).max(45).required(),
    password: Joi.string().min(6).required(),
    confirm_password: Joi.ref("password"),
  });

  try {
    const value = await schema.validateAsync(registerInfo);
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

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  try {
    if (req.method !== "POST")
      return res
        .status(405)
        .json({ success: false, error: "Method not allowed" });

    const { first_name, middle_name, last_name, email, major, password }: Body =
      req.body;
    const { c_id } = req.query;

    // Validate req.body from user
    const { success, error } = await isValid(req.body);
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

    // Validate unique user
    const { rows: users } = await client.query(
      "SELECT * FROM users WHERE email = $1;",
      [email]
    );
    if (users.length !== 0)
      return res
        .status(400)
        .json({ success: false, error: "Email already registered" });

    // Save user to db
    const savingUserResponse = await client.query(
      "INSERT INTO users(email, password, updated_at, card_id, first_name, middle_name, last_name, major) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);",
      [
        email,
        await PasswordHelper.hashPassword(password),
        new Date(),
        cardId,
        first_name.trim(),
        middle_name.trim(),
        last_name.trim(),
        major,
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
