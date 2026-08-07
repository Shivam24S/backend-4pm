import transporter from "../config/email.js";
import nodemailer from "nodemailer";

const sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: '"MealDash" rnw.shivam.s@gmail.com',
      to,
      subject,
      html,
    });

    console.log("Message sent: %s", info.messageId);
    // Preview URL is only available when using an Ethereal test account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.error("Error while sending mail:", err);
  }
};

export default sendEmail;
