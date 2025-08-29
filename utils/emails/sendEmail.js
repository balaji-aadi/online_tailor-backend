import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, html) => {
  try {
    console.log("to:",to)
    const testAccount= await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: 'lue.cassin95@ethereal.email',
        pass: 'UBYTdKvJqgQ4TCTCFT'
    },
  });

    let info= await transporter.sendMail({
      from: `"Tailor Platform" <lue.cassin95@ethereal.email>`,
      to,
      subject,
      html,
    });

    console.log(`📧 Email sent to`,info);
  } catch (err) {
    console.error(`❌ Email sending failed ${to}:`, err);
  }
};
