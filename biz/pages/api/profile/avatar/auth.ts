import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import ImageKit from "imagekit";

type ApiResponse = {
  success: boolean
  error: boolean | string
} | {
  token: string;
  expire: number;
  signature: string;
}

async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  if (!req.session.user?.isAuthenticated)
    return res.status(403).json({
      success: false,
      error: "Not authenticated",
    });

  if (req.method !== "GET")
    return res.status(403).json({
      success: false,
      error: "Method not allowed",
    });

  const imagekit = new ImageKit({
    urlEndpoint: process.env.NEXT_PUBLIC_IMGKIT_URL_ENDPOINT as string,
    publicKey: process.env.NEXT_PUBLIC_IMGKIT_PUBLIC_KEY as string,
    privateKey: process.env.IMGKIT_PRIVATE_KEY as string,
  });

  const result = imagekit.getAuthenticationParameters();

  res.json(result);
}

export default withIronSessionApiRoute(handler, sessionOptions);
