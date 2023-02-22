import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../db/client";
import { ApiResponse } from "../register";
import { validate as uuidValidate } from "uuid";

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
    const { rows: profileView } = await client.query(
      "SELECT users.id as user_id, first_name, middle_name, last_name, avatar_url, links.url as pdf_url, symplicity_resume_links.url as symplicity_url FROM links RIGHT JOIN users ON users.id=links.user_id LEFT JOIN symplicity_resume_links ON users.id=symplicity_resume_links.user_id WHERE users.id=$1;",
      [userId]
    );

    return res.status(200).json({ success: profileView, error: false });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
}
