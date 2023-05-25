import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@/db/client";
import { sessionOptions } from "@/lib/session";

type ApiResponse = {
  success: boolean
  error: string | boolean
}

async function link(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  try {
    if (!req.session.user?.isAuthenticated)
      return res
        .status(403)
        .json({ success: false, error: "Not authenticated" });

    if (req.method !== "POST" && req.method !== "DELETE")
      return res
        .status(403)
        .json({ success: false, error: "Method not allowed" });

    if (req.method === 'POST') {
      const { link_title, url } = req.body;

      // Validate input
      if (link_title.trim().length === 0 || url.trim().length === 0) return res.status(400).json({ success: false, error: 'Please fill in all fields.' });

      // Validate URL
      new URL(url)

      // Make sure link_title is unique
      const { rows } = await client.query('SELECT * FROM links WHERE user_id=(SELECT id FROM users WHERE email = $1) AND link_title=$2',
        [req.session.user.email, link_title])
      if (rows.length > 0) return res.status(400).json({
        success: false,
        error: 'Link title already used.'
      })

      // Save link to database
      const response = await client.query(
        "INSERT INTO links(user_id, url, updated_at, link_title) VALUES ( (SELECT id FROM users WHERE email = $1), $2, $3, $4) ON CONFLICT (user_id, link_title) DO UPDATE SET url=$2, updated_at=$3",
        [req.session.user.email, url, new Date(), link_title]
      );
      if (!response) throw "Error adding link";

      return res.status(200).json({ success: true, error: false });
    }


    if (req.method === 'DELETE') {
      const { link_title } = req.query

      const response = await client.query(
        "DELETE FROM links WHERE link_title=$1 AND user_id=(SELECT id FROM users WHERE email=$2)",
        [link_title, req.session.user?.email,]
      );
      if (!response) throw "Error deleting link";

      return res.status(200).json({ success: true, error: false });
    }
  } catch (error: any) {
    if (error.code === 'ERR_INVALID_URL') return res
      .status(400)
      .json({ success: false, error: "Invalid URL." });

    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
}

export default withIronSessionApiRoute(link, sessionOptions);
