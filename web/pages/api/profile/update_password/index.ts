import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@/db/client";
import { sessionOptions } from "@/lib/session";
import { ApiResponse } from "../../register";
import PasswordHelper from "../../../../helpers/PasswordHelper";

async function profile(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
    try {
        if (!req.session.user?.isAuthenticated)
            return res
                .status(403)
                .json({ success: false, error: "Not authenticated" });

        if (req.method !== "POST")
            return res
                .status(405)
                .json({ success: false, error: "Method not allowed" });

        const { current_password, new_password, confirm_new_password } = req.body;

        // Validate new_password
        if (!new_password || (new_password as string).trim().length < 6)
            return res
                .status(400)
                .json({ error: "New password needs to have at least 6 characters", success: false });

        // Validate retype_new_password
        if (new_password !== confirm_new_password)
            return res
                .status(400)
                .json({ error: "Confirm new password does not match", success: false });

        // Validate current_password
        const email = req.session.user.email
        const { rows } = await client.query(
            "SELECT email, password FROM users WHERE email=$1", [email]
        );

        if (!(await PasswordHelper.comparePassword(current_password, rows[0].password)))
            return res
                .status(403)
                .json({ error: "Wrong current password", success: false });

        // Update user password
        const hashedPassword = await PasswordHelper.hashPassword(new_password)
        const response = await client.query('UPDATE users SET password=$1, updated_at=$2 WHERE email=$3', [hashedPassword, new Date(), email])
        if (!response) throw new Error("Error updating user password");

        return res.status(200).json({ success: true, error: false });
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ success: false, error: "Internal server error" });
    }
}

export default withIronSessionApiRoute(profile, sessionOptions);
