import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import client from "../../db/client";
import { sessionOptions } from "../../lib/session";
import { ApiResponse } from "./register";

async function dashboard(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
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
      "SELECT student_id, first_name, middle_name, last_name, username, avatar_url, major, university_name FROM recruiter_dashboard ORDER BY first_name;"
    );

    return res.status(200).json({ success: rows, error: false });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
}

export default withIronSessionApiRoute(dashboard, sessionOptions);
