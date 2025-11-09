const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, text, attachments = [] }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true if 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Website Contact" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
    attachments,
  });
};

module.exports = sendEmail;
