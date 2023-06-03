import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@/db/client";
import { sessionOptions } from "@/lib/session";

type ApiResponse = {
    success: {
        date: string
        count: number
    }[] | boolean
    error: string | boolean
}

async function analytics(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
    try {
        if (!req.session.user?.isAuthenticated)
            return res
                .status(403)
                .json({ success: false, error: "Not authenticated" });

        if (req.method !== "GET")
            return res
                .status(403)
                .json({ success: false, error: "Method not allowed" });

        const { rows }: {
            rows: {
                date: string
                count: number
            }[]
        } = await client.query(
            "SELECT date_trunc('day', scanned_at) AS date, COUNT(*) AS count FROM profile_view_histories WHERE user_id=(SELECT id FROM users WHERE email=$1) GROUP BY user_id, date_trunc('day', scanned_at) ORDER BY date_trunc('day', scanned_at)",
            [req.session.user?.email]
        );

        return res.status(200).json({ success: rows, error: false });
    } catch (error) {
        console.error('Error getting profile view histories', error);
        return res
            .status(500)
            .json({ success: false, error: "Internal server error" });
    }
}

export default withIronSessionApiRoute(analytics, sessionOptions);
