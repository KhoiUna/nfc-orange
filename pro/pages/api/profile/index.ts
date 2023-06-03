import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@/db/client";
import { sessionOptions } from "@/lib/session";
import { Link, User } from "@/types/types";

type ApiResponse = {
  success: boolean | {
    user: User
    video_link: Link | null
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
      "SELECT link_title, url FROM links WHERE user_id=(SELECT id FROM users WHERE email = $1) AND NOT link_title='Video'",
      [req.session.user?.email]
    );

    const { rows: video_link } = await client.query(
      "SELECT link_title, url FROM links WHERE user_id=(SELECT id FROM users WHERE email = $1) AND link_title='Video'",
      [req.session.user?.email]
    );

    const { rows } = await client.query(
      "SELECT id, email, first_name, middle_name, last_name, avatar_url, phone_number, bio, card_id, username, is_premium FROM users WHERE email = $1",
      [req.session.user?.email]
    );

    return res.status(200).json({
      success: {
        user: rows[0],
        video_link: video_link[0],
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
