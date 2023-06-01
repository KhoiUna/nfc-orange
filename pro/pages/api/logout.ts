import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";

async function logoutRoute(req: NextApiRequest, res: NextApiResponse) {
  req.session.destroy();
  res.redirect("/");
}

export default withIronSessionApiRoute(logoutRoute, sessionOptions);
