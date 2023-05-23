"use strict";

require("dotenv").config();
const hbs = require("nodemailer-express-handlebars");
const nodemailer = require("nodemailer");
const path = require("node:path");
const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);

const sendMailgun = async (toAddress, subject, toName, emailTemplate) => {
  try {
    const mg = mailgun.client({
      username: "api",
      key: process.env.MAILGUN_API_KEY,
    });

    const MAILGUN_DOMAIN = "mg.nfcorange.com";

    await mg.messages.create(MAILGUN_DOMAIN, {
      from: `NFC Orange <contact@${MAILGUN_DOMAIN}>`,
      to: [`${toName} <${toAddress}>`],
      subject,
      template: emailTemplate,
      "h:X-Mailgun-Variables": JSON.stringify({ name: toName }),
    });

    return true;
  } catch (error) {
    console.error(error);
    return;
  }
};

const sendMailgunWaitlist = async (toAddress, toName, firstName) => {
  try {
    const mg = mailgun.client({
      username: "api",
      key: process.env.MAILGUN_API_KEY,
    });

    const MAILGUN_DOMAIN = "mg.nfcorange.com";

    await mg.messages.create(MAILGUN_DOMAIN, {
      from: `NFC Orange <contact@${MAILGUN_DOMAIN}>`,
      to: [`${toName} <${toAddress}>`],
      subject: `Welcome 👋 ${toName} from NFC Orange 🍊`,
      template: "waitlist",
      "h:X-Mailgun-Variables": JSON.stringify({
        name: toName,
        email: toAddress,
        password: firstName.toLowerCase() + "123",
      }),
    });

    return true;
  } catch (error) {
    console.error(error);
    return;
  }
};

const sendNodemailer = async (toAddress, subject, toName, emailTemplate) => {
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
      template: emailTemplate,
      context: {
        subject,
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

module.exports = { sendMailgun, sendNodemailer, sendMailgunWaitlist };
