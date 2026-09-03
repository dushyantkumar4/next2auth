import nodemailer from "nodemailer";

interface MailProp {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string;
}

export const sendEmails = async ({ email, emailType, userId }: MailProp) => {
  try {
    // TODO: configure mail for usage
    const transporter = nodemailer.createTransport({
      host: "smtp.example.com",
      port: 587,
      secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: "dushyantvelar@gmail.com", // sender address
      to: email, // list of recipients
      subject:
        emailType === "VERIFY" ? "Verify your email" : "reset your password", // subject line
      html: "<b>Hello world?</b>", // HTML body
    };
    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("something went wrong");
  }
};
