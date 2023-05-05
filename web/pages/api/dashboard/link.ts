import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../db/client";
import { sessionOptions } from "../../../lib/session";
import { ApiResponse } from "../register";

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

      // Save link to database
      const response = await client.query(
        "INSERT INTO links(user_id, url, updated_at, link_title) VALUES ( (SELECT id FROM users WHERE email = $1), $2, $3, $4) ON CONFLICT (user_id, link_title) DO UPDATE SET url=$2, updated_at=$3",
        [req.session.user?.email, url, new Date(), link_title]
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
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
}

export default withIronSessionApiRoute(link, sessionOptions);
