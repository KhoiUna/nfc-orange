import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions, User } from "../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";

async function userRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  const user = req.session.user;
  res.json(user as User);
}

export default withIronSessionApiRoute(userRoute, sessionOptions);
