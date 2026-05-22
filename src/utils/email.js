const nodemailer = require("nodemailer");

let transporter;

const getTransporter = () => {
  if (!process.env.SMTP_HOST) {
    return null;
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      auth:
        process.env.SMTP_USER && process.env.SMTP_PASS
          ? {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            }
          : undefined,
    });
  }

  return transporter;
};

const sendEmail = async ({ to, subject, text }) => {
  const from = process.env.EMAIL_FROM || "HireInfinity <no-reply@hireinfinity.local>";
  const smtp = getTransporter();

  if (!smtp) {
    if (process.env.NODE_ENV !== "test") {
      console.log(`[email skipped] To: ${to} | Subject: ${subject}`);
    }
    return { skipped: true };
  }

  return smtp.sendMail({ from, to, subject, text });
};

module.exports = {
  sendEmail,
};
