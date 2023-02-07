import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { ApiResponse } from "../register";
import client from "../../../db/client";
import { sessionOptions } from "@/lib/session";
import { MAX_WORD_COUNT } from "../../../app/dashboard/note/[student_id]/page";

async function login(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  try {
    if (!req.session.user?.isAuthenticated)
      return res
        .status(403)
        .json({ success: false, error: "Not authenticated" });

    if (req.method !== "POST" && req.method !== "GET")
      return res
        .status(405)
        .json({ success: false, error: "Method not allowed" });

    if (req.method === "POST") {
      const { note, student_id } = req.body;

      if (note.length > MAX_WORD_COUNT)
        return res.json({
          success: false,
          error: "Note length exceeds word limit.",
        });

      const response = await client.query(
        "INSERT INTO recruiter_notes(note, recruiter_id, user_id) VALUES ($1, (SELECT id FROM recruiters WHERE email=$2), $3) ON CONFLICT (user_id) DO UPDATE SET note = $1, updated_at = $4;",
        [note, req.session.user.email, student_id, new Date()]
      );
      if (!response)
        return res
          .status(500)
          .json({ success: false, error: "Error saving note" });

      return res.status(200).json({ success: true, error: false });
    }

    if (req.method === "GET") {
      const { student_id } = req.query;

      const { rows: studentRows } = await client.query(
        "SELECT first_name, middle_name, last_name FROM users WHERE id=$1;",
        [student_id]
      );

      const { rows: noteRows } = await client.query(
        "SELECT note FROM recruiter_notes JOIN users ON users.id=user_id WHERE user_id=$1;",
        [student_id]
      );
      if (noteRows.length === 0)
        return res.status(200).json({
          success: {
            ...studentRows[0],
            note: "",
          },
          error: false,
        });

      const note = noteRows[0].note;

      return res.status(200).json({
        success: {
          ...studentRows[0],
          note,
        },
        error: false,
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
}

export default withIronSessionApiRoute(login, sessionOptions);
