import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@/db/client";
import { sessionOptions } from "@/lib/session";


type History = {
    date: string
    count: number
}[]

type ApiResponse = {
    success: boolean | {
        profileViewHistory: History
        cardTapHistory: History
        qrHistory: History
    }
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

        const { rows: profileViewHistory }: { rows: History } = await client.query(
            "SELECT date_trunc('day', scanned_at) AS date, COUNT(*) AS count FROM profile_view_histories WHERE user_id=(SELECT id FROM users WHERE email=$1) GROUP BY user_id, date_trunc('day', scanned_at) ORDER BY date_trunc('day', scanned_at)",
            [req.session.user?.email]
        );

        const { rows: cardTapHistory }: { rows: History } = await client.query(
            "SELECT date_trunc('day', scanned_at) AS date, COUNT(*) AS count FROM card_tap_histories WHERE card_id=(SELECT card_id FROM users WHERE email=$1) GROUP BY date_trunc('day', scanned_at) ORDER BY date_trunc('day', scanned_at)",
            [req.session.user?.email]
        );

        const { rows: qrHistory }: { rows: History } = await client.query(
            "SELECT date_trunc('day', scanned_at) AS date, COUNT(*) AS count FROM qr_histories WHERE user_id=(SELECT id FROM users WHERE email=$1) GROUP BY date_trunc('day', scanned_at) ORDER BY date_trunc('day', scanned_at)",
            [req.session.user?.email]
        );

        return res.status(200).json({ success: { profileViewHistory, cardTapHistory, qrHistory }, error: false });
    } catch (error) {
        console.error('Error getting profile view histories', error);
        return res
            .status(500)
            .json({ success: false, error: "Internal server error" });
    }
}

export default withIronSessionApiRoute(analytics, sessionOptions)