import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../db/client";
import { ApiResponse } from "../register";

export default async function scan(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  try {
    if (req.method !== "POST")
      return res
        .status(403)
        .json({ success: false, error: "Method not allowed" });

    const { c_id } = req.query;

    // Check if card exists
    const { rows } = await client.query(
      "SELECT id FROM cards WHERE uuid = $1;",
      [c_id]
    );
    if (rows.length !== 1)
      return res.status(400).json({ success: false, error: "Invalid card" });

    // Check if card is registered
    const cardId = rows[0].id;
    const { rows: users } = await client.query(
      "SELECT id FROM users WHERE card_id = $1;",
      [cardId]
    );
    if (users.length !== 1)
      return res.status(400).json({ success: false, error: "Invalid card" });

    // TODO: add scan history
    const saveScanHistoryResponse = await client.query(
      "INSERT INTO scan_history(card_id, scanned_at) VALUES ($1, $2);",
      [cardId, new Date()]
    );

    if (!saveScanHistoryResponse) throw new Error("Error saving scan history");

    return res.status(200).json({ success: true, error: false });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
}
