import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import client from "../../db/client";
import { sessionOptions } from "../../lib/session";
import { ApiResponse } from "./register";

async function profile(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  try {
    if (req.method !== "GET")
      return res
        .status(403)
        .json({ success: false, error: "Method not allowed" });

    const { rows } = await client.query(
      "SELECT url FROM links WHERE user_id = (SELECT id FROM users WHERE email = $1);",
      [req.session.user?.email]
    );

    return res.status(200).json({ success: rows, error: false });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
}

export default withIronSessionApiRoute(profile, sessionOptions);
