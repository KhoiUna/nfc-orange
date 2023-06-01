import { NextApiRequest, NextApiResponse } from "next";
import client from "@/db/client";
import { Link, User } from "@/types/types";

type ApiResponse = {
    success: boolean | {
        user: User
        links: Link[]
        video_link: Link
    },
    error: string | boolean
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse>
) {
    try {
        if (req.method !== "GET" && req.method !== "POST")
            return res
                .status(403)
                .json({ success: false, error: "Method not allowed" });

        const { username } = req.query;

        if (req.method === 'GET') {
            if (!username)
                return res.status(400).json({ success: false, error: "Invalid profile" });

            // Check if username exists
            const { rows: users } = await client.query(
                "SELECT id FROM users WHERE username=$1",
                [username]
            );
            if (users.length !== 1)
                return res.status(400).json({ success: false, error: "Invalid profile" });

            // Send pdf url
            const userId = users[0].id;
            const { rows: links } = await client.query(
                "SELECT link_title, url FROM links WHERE user_id=$1 AND NOT link_title='Video'",
                [userId]
            );

            const { rows: resume_link } = await client.query(
                "SELECT link_title, url FROM links WHERE user_id=(SELECT id FROM users WHERE id=$1) AND link_title='Video'",
                [userId]
            );

            const { rows: user } = await client.query(
                "SELECT first_name, middle_name, last_name, avatar_url, bio FROM users WHERE id=$1",
                [userId]
            );

            return res.status(200).json({
                success: {
                    user: user[0],
                    video_link: resume_link[0],
                    links
                }, error: false
            });
        }

        if (req.method === 'POST') {
            // Check if username exists
            const { rows: users } = await client.query(
                "SELECT id FROM users WHERE username=$1",
                [username]
            );
            if (users.length !== 1)
                return res.status(400).json({ success: false, error: "Invalid profile" });

            const userId = users[0].id;

            const saveProfileViewResponse = await client.query(
                "INSERT INTO profile_view_histories(user_id, scanned_at) VALUES ($1, $2);",
                [userId, new Date()]
            );

            if (!saveProfileViewResponse) throw new Error("Error saving profile view.");

            return res.status(200).json({ success: true, error: false });
        }
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ success: false, error: "Internal server error" });
    }
}
