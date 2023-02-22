import axios from "axios";
import { error } from "console";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../db/client";
import { sessionOptions } from "../../../lib/session";
import { ApiResponse } from "../register";

async function upload(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  try {
    if (!req.session.user?.isAuthenticated)
      return res
        .status(403)
        .json({ success: false, error: "Not authenticated" });

    if (req.method !== "POST")
      return res
        .status(403)
        .json({ success: false, error: "Method not allowed" });

    const { symplicityLink } = req.body;

    // const { data } = await axios.post(
    //   `${process.env.NODE_DOWNLOAD_API}/api/download`,
    //   {
    //     user_email: req.session.user.email,
    //     download_url: symplicityLink,
    //   },
    //   {
    //     timeout: 3000,
    //   }
    // );
    // if (data.error) throw new Error("POST error to node-download-server");

    // const pdfURL = data.success;
    // console.log(JSON.stringify(data));

    // // Save link to database
    // const response = await client.query(
    //   "INSERT INTO symplicity_resume_links(user_id, url, updated_at) VALUES ((SELECT id FROM users WHERE email = $1), $2, $3) ON CONFLICT (user_id) DO UPDATE SET url = $2, updated_at = $3;",
    //   [req.session.user?.email, pdfURL, new Date()]
    // );
    // if (!response) throw "Error saving Symplicity link";

    // return res.status(200).json({ success: true, error: false });

    //
    //
    //
    axios
      .post(`${process.env.NODE_DOWNLOAD_API}/api/download`, {
        download_url: symplicityLink,
      })
      .then(({ data }) => {
        console.log(JSON.stringify(data));
        return res.status(200).json({ success: true, error: false });
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);

        return res
          .status(500)
          .json({ success: false, error: "Internal server error" });
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
}

export default withIronSessionApiRoute(upload, sessionOptions);
