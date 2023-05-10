import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@/db/client";
import { sessionOptions } from "@/lib/session";
import { ApiResponse } from "../register";

type Body = {
    richTextBio: string
    text: string
}

const MAX_WORD_COUNT = 100

async function bio(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
    try {
        if (!req.session.user?.isAuthenticated)
            return res
                .status(403)
                .json({ success: false, error: "Not authenticated" });

        if (req.method !== "POST")
            return res
                .status(403)
                .json({ success: false, error: "Method not allowed" });

        const { richTextBio, text }: Body = req.body

        // Validate empty bio with text
        if (text.trim().length === 0)
            return res
                .status(400)
                .json({ success: false, error: "Empty bio!" });

        // Validate bio length with text
        if (text.length > MAX_WORD_COUNT)
            return res
                .status(400)
                .json({ success: false, error: "Bio is too long." });

        // Update column `bio` in table `users`
        const response = await client.query('UPDATE users SET bio=$1 WHERE email=$2', [richTextBio, req.session.user.email])
        if (!response) throw 'Error updating bio.'

        return res.status(200).json({ success: true, error: false });
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ success: false, error: "Internal server error" });
    }
}

export default withIronSessionApiRoute(bio, sessionOptions);
