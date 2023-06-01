import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@/db/client";
import { sessionOptions } from "@/lib/session";

type ApiResponse = {
  success: boolean
  error: boolean | string
}

async function profile(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  try {
    if (!req.session.user?.isAuthenticated)
      return res
        .status(403)
        .json({ success: false, error: "Not authenticated" });

    if (req.method !== "POST")
      return res
        .status(403)
        .json({ success: false, error: "Method not allowed" });

    const { avatar_url } = req.body;

    const updateUserAvatarResponse = await client.query(
      "UPDATE users SET avatar_url=$1 WHERE email=$2;",
      [avatar_url, req.session.user?.email]
    );

    if (!updateUserAvatarResponse) throw new Error("Error updating avatar");

    return res.status(200).json({ success: true, error: false });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
}

export default withIronSessionApiRoute(profile, sessionOptions);
