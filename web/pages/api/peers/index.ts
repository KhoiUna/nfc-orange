import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../db/client";
import { sessionOptions } from "../../../lib/session";
import { ApiResponse } from "../register";

async function profile(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  try {
    if (!req.session.user?.isAuthenticated)
      return res
        .status(403)
        .json({ success: false, error: "Not authenticated" });

    if (req.method !== "GET")
      return res
        .status(403)
        .json({ success: false, error: "Method not allowed" });

    const { rows } = await client.query(
      "SELECT first_name, middle_name, last_name, avatar_url, major, universities.name as university_name FROM users JOIN universities ON users.university_id=universities.id GROUP BY first_name, middle_name, last_name, major, avatar_url, university_name ORDER BY first_name;"
    );

    return res.status(200).json({
      success: {
        students: rows,
      },
      error: false,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
}

export default withIronSessionApiRoute(profile, sessionOptions);
