import type { NextApiRequest, NextApiResponse } from "next";
import Joi from "joi";
import client from "../../db/client";
import PasswordHelper from "../../helpers/PasswordHelper";

const TEST_COMPANY_ID = 1; // TODO: remove TEST_COMPANY_ID

export type ApiResponse = {
  success: any;
  error: any;
};

const isValid = async (registerInfo: any) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().trim().required(),
    password: Joi.string().min(6).required(),
    confirm_password: Joi.ref("password"),
    readerID: Joi.string().trim().required(),
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

    const { email, password } = req.body;
    const { r_id } = req.query;

    // Validate req.body from user
    const { error } = await isValid(req.body);
    if (error) return res.status(400).json({ success: false, error });

    // Validate reader id r_id
    if (!r_id)
      return res.status(400).json({ success: false, error: "Invalid reader" });

    const { rows: readers } = await client.query(
      "SELECT * FROM readers WHERE serial_number = $1;",
      [r_id]
    );
    const readerID = readers[0].id;
    console.log(readerID);

    if (readers.length !== 1)
      return res
        .status(400)
        .json({ success: false, error: "Invalid registration" });

    // Validate that reader has not been registered by any recruiters
    const { rows } = await client.query(
      "SELECT * FROM recruiters WHERE reader_id = $1;",
      [readerID]
    );
    if (rows.length !== 0)
      return res
        .status(400)
        .json({ success: false, error: "Reader already registered" });

    // Validate user is not students
    const { rows: users } = await client.query(
      "SELECT * FROM users WHERE email = $1;",
      [email]
    );
    if (users.length !== 0)
      return res
        .status(400)
        .json({ success: false, error: "Email already registered" });

    // Validate unique email
    const { rows: recruiters } = await client.query(
      "SELECT * FROM recruiters WHERE email = $1;",
      [email]
    );
    if (recruiters.length !== 0)
      return res
        .status(400)
        .json({ success: false, error: "Email already registered" });

    // Save user to db
    const savingUserResponse = await client.query(
      "INSERT INTO recruiters(email, password, company_id, reader_id) VALUES ($1, $2, $3, $4);",
      [
        email,
        await PasswordHelper.hashPassword(password),
        TEST_COMPANY_ID,
        readerID,
      ]
    );

    if (!savingUserResponse) throw new Error("Error saving recruiter");

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
