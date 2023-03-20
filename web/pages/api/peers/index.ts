import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../db/client";
import { sessionOptions } from "../../../lib/session";
import { ApiResponse } from "../register";

async function profile(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  try {
    // TODO: Delete this line
    return res.json({
      success: {
        students: [
          {
            first_name: "Amber",
            middle_name: "",
            last_name: "Sandvig",
            avatar_url: null,
            major: "Professional Management ",
            university_name: "University of North Alabama",
          },
          {
            first_name: "Austin-Michael",
            middle_name: "Kerr",
            last_name: "Rasberry",
            avatar_url: null,
            major: "Computer Science",
            university_name: "University of North Alabama",
          },
          {
            first_name: "Avish",
            middle_name: "",
            last_name: "Yadav",
            avatar_url:
              "https://ik.imagekit.io/chekchat/nfc-orange/production/avatar-Avish-Yadav_nIq7Qgzrze.png",
            major: "Global business ",
            university_name: "University of North Alabama",
          },
          {
            first_name: "Baily",
            middle_name: "Jean",
            last_name: "Bishop",
            avatar_url: null,
            major: "Professional Management",
            university_name: "University of North Alabama",
          },
          {
            first_name: "Carson",
            middle_name: "Michael",
            last_name: "Scott",
            avatar_url:
              "https://ik.imagekit.io/chekchat/nfc-orange/production/avatar-Carson-Scott_UQcCG-_d7.png",
            major: "Finance",
            university_name: "University of North Alabama",
          },
          {
            first_name: "Casey",
            middle_name: "Holt ",
            last_name: "Freemon",
            avatar_url: null,
            major: "Finance ",
            university_name: "University of North Alabama",
          },
          {
            first_name: "Cody",
            middle_name: "James",
            last_name: "McDonald",
            avatar_url: null,
            major: "Information Technology",
            university_name: "University of North Alabama",
          },
          {
            first_name: "Diksha",
            middle_name: "",
            last_name: "Chottani",
            avatar_url: null,
            major: "Computer Science ",
            university_name: "University of North Alabama",
          },
          {
            first_name: "Fnu",
            middle_name: "",
            last_name: "Gungun",
            avatar_url: null,
            major: "Computer science ",
            university_name: "University of North Alabama",
          },
          {
            first_name: "Hai",
            middle_name: "",
            last_name: "Tran",
            avatar_url:
              "https://ik.imagekit.io/chekchat/nfc-orange/production/avatar-Hai-Tran_lBus2hIMW.png",
            major: "Human Resources Management - Psychology",
            university_name: "University of North Alabama",
          },
          {
            first_name: "Haley",
            middle_name: "Morgan",
            last_name: "Donaldson",
            avatar_url: null,
            major: "Finance",
            university_name: "University of North Alabama",
          },
          {
            first_name: "Hannah",
            middle_name: "",
            last_name: "Kirk",
            avatar_url: null,
            major: "Accounting",
            university_name: "University of North Alabama",
          },
          {
            first_name: "Jacob ",
            middle_name: "Vance",
            last_name: "Parry",
            avatar_url:
              "https://ik.imagekit.io/chekchat/nfc-orange/production/avatar-Jacob_-Parry_4HD83Ajjmp.png",
            major: "Accounting ",
            university_name: "University of North Alabama",
          },
          {
            first_name: "Jordan",
            middle_name: "Alexander ",
            last_name: "Hunter",
            avatar_url: null,
            major: "Professional Finance ",
            university_name: "University of North Alabama",
          },
          {
            first_name: "Joseph",
            middle_name: "Isaac",
            last_name: "Grijalva ",
            avatar_url:
              "https://ik.imagekit.io/chekchat/nfc-orange/production/avatar-Joseph-Grijalva__g-qc7RMXOs.png",
            major: "Computer Science ",
            university_name: "University of North Alabama",
          },
          {
            first_name: "Joseph ",
            middle_name: "David",
            last_name: "Augustus",
            avatar_url: null,
            major: "Finance/Marketing",
            university_name: "University of North Alabama",
          },
          {
            first_name: "Junnosuke",
            middle_name: null,
            last_name: "Noiri",
            avatar_url:
              "https://ik.imagekit.io/chekchat/nfc-orange/production/avatar-Junnosuke-Noiri_vKBtMAr1b.png",
            major: "Computer Information Systems",
            university_name: "University of North Alabama",
          },
          {
            first_name: "Karla",
            middle_name: "Ann",
            last_name: "Hildebrand ",
            avatar_url: null,
            major: "Data Analytics ",
            university_name: "University of North Alabama",
          },
          {
            first_name: "Khant",
            middle_name: "",
            last_name: "Khine",
            avatar_url:
              "https://ik.imagekit.io/chekchat/nfc-orange/production/avatar-Khant-Khine_zL7N17DJU_.png",
            major: "Electromechanical Engineering",
            university_name: "University of North Alabama",
          },
          {
            first_name: "Khoi",
            middle_name: "Tuan",
            last_name: "Nguyen",
            avatar_url:
              "https://ik.imagekit.io/chekchat/nfc-orange/production/avatar-Khoi-Nguyen__a6fRNchgS.png",
            major: "Information Technology",
            university_name: "University of North Alabama",
          },
          {
            first_name: "Kota",
            middle_name: null,
            last_name: "Mitsumoto",
            avatar_url: null,
            major: "Physics",
            university_name: "University of North Alabama",
          },
          {
            first_name: "Lauren",
            middle_name: "Elizabeth",
            last_name: "Potts",
            avatar_url: null,
            major: "Marketing",
            university_name: "University of North Alabama",
          },
          {
            first_name: "Maria ",
            middle_name: "Montserrat",
            last_name: "Terrazas-Guzman",
            avatar_url: null,
            major: "Management/project management ",
            university_name: "University of North Alabama",
          },
          {
            first_name: "Pahul Singh ",
            middle_name: "",
            last_name: "Jolly",
            avatar_url: null,
            major: "Business Administration ",
            university_name: "University of North Alabama",
          },
          {
            first_name: "Parminder",
            middle_name: "",
            last_name: "Singh",
            avatar_url: null,
            major: "Computer Science ",
            university_name: "University of North Alabama",
          },
          {
            first_name: "Rodnesia",
            middle_name: "Danielle",
            last_name: "Goodloe",
            avatar_url: null,
            major: "Computer Information Systems",
            university_name: "University of North Alabama",
          },
          {
            first_name: "Romain",
            middle_name: "",
            last_name: "Le Nohaic",
            avatar_url: null,
            major: "Finance",
            university_name: "University of North Alabama",
          },
          {
            first_name: "Rowena",
            middle_name: "",
            last_name: "Turner",
            avatar_url: null,
            major: "Interdisciplinary Studies",
            university_name: "University of North Alabama",
          },
          {
            first_name: "Thien",
            middle_name: "Duc",
            last_name: "Nguyen",
            avatar_url: null,
            major: "Professional Management ",
            university_name: "University of North Alabama",
          },
          {
            first_name: "Yu Tra Min ",
            middle_name: "",
            last_name: "Oo",
            avatar_url: null,
            major: "Finance",
            university_name: "University of North Alabama",
          },
        ],
      },
      error: false,
    });

    if (!req.session.user?.isAuthenticated)
      return res
        .status(403)
        .json({ success: false, error: "Not authenticated" });

    if (req.method !== "GET")
      return res
        .status(403)
        .json({ success: false, error: "Method not allowed" });

    const { rows } = await client.query(
      "SELECT first_name, middle_name, last_name, avatar_url, major, universities.name as university_name FROM users JOIN universities ON users.university_id=universities.id GROUP BY first_name, middle_name, last_name, major, avatar_url, university_name ORDER BY first_name;"
    );

    return res.status(200).json({
      success: {
        students: rows,
      },
      error: false,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
}

export default withIronSessionApiRoute(profile, sessionOptions);
