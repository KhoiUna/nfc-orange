import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";

async function logoutRoute(req: NextApiRequest, res: NextApiResponse) {
  if (!req.session.user?.isAuthenticated)
    return res.status(403).json({ success: false, error: "Not authenticated" });

  req.session.destroy();
  res.redirect("/login");
}

export default withIronSessionApiRoute(logoutRoute, sessionOptions);
