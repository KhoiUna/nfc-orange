import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@/db/client";
import { sessionOptions } from "@/lib/session";
import sanitizeHtml from 'sanitize-html';

type ApiResponse = {
    success: boolean,
    error: boolean | string
}

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

        const { text }: Body = req.body
        let { richTextBio }: Body = req.body

        // Sanitize richTextBio: ensure dangerous HTML tags are not saved to database
        richTextBio = sanitizeHtml(richTextBio)

        // Validate bio length with text
        if (text.length > MAX_WORD_COUNT)
            return res
                .status(400)
                .json({ success: false, error: "Bio is too long." });

        // Update column `bio` in table `users`
        const updateValue = text.trim().length === 0 ? null : richTextBio
        const response = await client.query('UPDATE users SET bio=$1 WHERE email=$2', [updateValue, req.session.user.email])
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
