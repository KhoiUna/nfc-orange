import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@/db/client";
import { sessionOptions } from "@/lib/session";
import { Link, User } from "@/types/types";

type ApiResponse = {
  success: boolean | {
    user: User
    resume_link: Link
    links: Link[],
  },
  error: string | boolean
}

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

    const { rows: links } = await client.query(
      "SELECT link_title, url FROM links WHERE user_id=(SELECT id FROM users WHERE email = $1) AND NOT link_title='My Resume'",
      [req.session.user?.email]
    );

    const { rows: resume_link } = await client.query(
      "SELECT link_title, url FROM links WHERE user_id=(SELECT id FROM users WHERE email = $1) AND link_title='My Resume'",
      [req.session.user?.email]
    );

    const { rows } = await client.query(
      "SELECT id, first_name, middle_name, last_name, major, avatar_url, bio, username, expected_grad_date, created_at FROM users WHERE email = $1",
      [req.session.user?.email]
    );

    return res.status(200).json({
      success: {
        user: rows[0],
        resume_link: resume_link[0]?.url,
        links,
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
