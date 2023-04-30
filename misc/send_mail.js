// Script to send email with Nodemailer
"use strict";

require("dotenv").config();
const hbs = require("nodemailer-express-handlebars");
const nodemailer = require("nodemailer");
const path = require("node:path");
const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.DATABASE_URI,
});

client
  .connect()
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.error("Error connecting to database", error);
  });

const sendMail = async (toAddress, subject, toName) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "nfcorange1@gmail.com",
        pass: process.env.NODEMAILER_GMAIL_APP_PASSWORD,
      },
    });

    // Point to the template folder
    const handlebarOptions = {
      viewEngine: {
        partialsDir: path.resolve("./email_templates/"),
        defaultLayout: false,
      },
      viewPath: path.resolve("./email_templates/"),
    };
    // Use a template file with nodemailer
    transporter.use("compile", hbs(handlebarOptions));

    // Send email
    const info = await transporter.sendMail({
      from: '"NFC Orange" <nfcorange1@gmail.com>',
      to: toAddress,
      subject,
      template: "email", // use email.handlebars template
      context: {
        name: toName, // replace {{name}} with `toName`
      },
    });
    if (!info.messageId) throw new Error("Error sending email");

    return info.messageId;
  } catch (error) {
    console.error(error);
    return;
  }
};

(async () => {
  const { rows } = await client.query(
    "SELECT first_name, last_name, email FROM users"
  );

  console.log(rows.length, "emails to send:");

  let count = 1;
  for (const row of rows) {
    const name = `${row.first_name} ${row.last_name[0]}.`;
    const email = row.email;

    const response = await sendMail(
      email,
      "📎 Instant Update: Upload Custom PDFs for Your NFC Orange Card! 🎉",
      name
    );
    if (!response) process.exit(1);

    console.log(`${count}. Successfully sent email to`, name);
    count++;
  }

  console.log("Send emails successfully!");
  process.exit();
})();
