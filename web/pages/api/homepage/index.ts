import { NextApiRequest, NextApiResponse } from "next";
import client from "@/db/client";

type ApiResponse = {
    success: boolean
    error: boolean | string
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

        const { rows } = await client.query('SELECT COUNT(*) FROM users')

        return res.json({
            success: rows[0],
            error: false
        })
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ success: false, error: "Internal server error" });
    }
}
