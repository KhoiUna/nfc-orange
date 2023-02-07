import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { ApiResponse } from "../register";
import client from "../../../db/client";

async function login(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  try {
    if (!req.session.user?.isAuthenticated)
      return res
        .status(403)
        .json({ success: false, error: "Not authenticated" });

    if (req.method !== "POST")
      return res
        .status(405)
        .json({ success: false, error: "Method not allowed" });

    if (req.method === "POST") {
      const { note } = req.body;

      // Update table recruiter_notes with new note
      //   const updateRecruiterNoteResponse = await client.query(
      //     "UPDATE recruiters SET last_logged_in=$1 WHERE email = $2;",
      //     [new Date(), email]
      //   );
      //   if (!updateRecruiterNoteResponse)
      //     throw new Error("Error update recruiter's last_logged_in timestamp");

      return res.status(200).json({ success: true, error: false });
    }

    if (req.method === "GET") {
      return res.status(200).json({ success: true, error: false });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
}

export default withIronSessionApiRoute(login, sessionOptions);
