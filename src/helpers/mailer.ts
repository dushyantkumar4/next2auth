import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";
import { MailtrapTransport } from "mailtrap";
const TOKEN = process.env.MAIL_TOKEN;

interface MailProp {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string;
}

export const sendEmails = async ({ email, emailType, userId }: MailProp) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    const url =
      emailType === "VERIFY"
        ? `${process.env.DOMAIN}/verifyemail?token=${hashedToken}`
        : `${process.env.DOMAIN}/resetpassword?token=${hashedToken}`;
    const html = `<p> Click <a href="${url}">here</a>
      to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}.</p>
    <p>
     Or copy and paste the link below into your browser:
    </p>
    <p>${url}</p>`;

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 360000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPassToken: hashedToken,
        forgotPassExpiry: Date.now() + 360000,
      });
    }

    // const transport = nodemailer.createTransport({
    //   host: "smtp.example.com",
    //   port: 587,
    //   secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
    //   auth: {
    //     user: process.env.SMTP_USER,
    //     pass: process.env.SMTP_PASS,
    //   },
    // });
    const transport = nodemailer.createTransport(
      MailtrapTransport({
        token: TOKEN,
      }),
    );

    const sender = {
      address: "hello@demomailtrap.co",
      name: "My App",
    };

    const mailOptions = {
      from: sender, // sender address
      to: email, // list of recipients
      subject:
        emailType === "VERIFY" ? "Verify your email" : "reset your password", // subject line
      html,
    };
    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("something went wrong");
  }
};
