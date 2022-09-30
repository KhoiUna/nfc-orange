import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../db/client";
import PasswordHelper from "../../helpers/PasswordHelper";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";

export type ApiResponse = {
  success: any;
  error: any;
};

async function login(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  try {
    if (req.method !== "POST")
      return res
        .status(405)
        .json({ success: false, error: "Method not allowed" });

    const { email, password } = req.body;

    // Validate email and password
    const { rows } = await client.query(
      "SELECT email, password FROM users WHERE email = $1;",
      [email]
    );

    if (rows.length === 0)
      return res
        .status(403)
        .json({ error: "Invalid credentials", success: false });

    if (!(await PasswordHelper.comparePassword(password, rows[0].password)))
      return res
        .status(403)
        .json({ error: "Invalid credentials", success: false });

    const user = {
      isAuthenticated: true,
      email,
    };
    req.session.user = user;
    await req.session.save();

    return res.status(200).json({ success: user, error: false });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
}

export default withIronSessionApiRoute(login, sessionOptions);
