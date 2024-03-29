import { NextApiRequest, NextApiResponse } from "next";
import client from "@/db/client";
import { validate as uuidValidate } from "uuid";
import { Link, User } from "@/types/types";

type ApiResponse = {
  success: boolean | {
    user: User
    links: Link[]
    resume_link: string
  },
  error: string | boolean
}

export default async function view(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  try {
    if (req.method !== "GET")
      return res
        .status(403)
        .json({ success: false, error: "Method not allowed" });

    const { c_id } = req.query;

    if (!c_id)
      return res.status(400).json({ success: false, error: "invalid" });

    if (!uuidValidate(c_id as string))
      return res.status(400).json({ success: false, error: "invalid" });

    // Check if card exists
    const { rows } = await client.query(
      "SELECT id FROM cards WHERE uuid = $1;",
      [c_id]
    );
    if (rows.length !== 1)
      return res.status(400).json({ success: false, error: "invalid" });

    // Check if card is registered
    const cardId = rows[0].id;
    const { rows: users } = await client.query(
      "SELECT id FROM users WHERE card_id = $1;",
      [cardId]
    );
    if (users.length !== 1)
      return res.status(400).json({ success: false, error: "register" });

    // Send pdf url
    const userId = users[0].id;
    const { rows: links } = await client.query(
      "SELECT link_title, url FROM links WHERE user_id=$1 AND NOT link_title='My Resume'",
      [userId]
    );

    const { rows: resume_link } = await client.query(
      "SELECT link_title, url FROM links WHERE user_id=(SELECT id FROM users WHERE id=$1) AND link_title='My Resume'",
      [userId]
    );

    const { rows: user } = await client.query(
      "SELECT first_name, middle_name, last_name, major, avatar_url, username, bio FROM users WHERE id=$1",
      [userId]
    );

    return res.status(200).json({
      success: {
        user: user[0],
        resume_link: resume_link[0]?.url,
        links
      }, error: false
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
}
