import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    // Wrap dynamic HTML in a branded template
    const wrappedHtml = `
      <div style="max-width:600px;margin:auto;font-family:Arial,sans-serif;border:1px solid #ddd;border-radius:10px;overflow:hidden;">
        
        <!-- Header with logo -->
        <div style="background:#f8f9fa;padding:20px;text-align:center;">
          <img src="https://yourdomain.com/logo.png" alt="Company Logo" style="max-height:60px;" />
        </div>
        
        <!-- Body -->
        <div style="padding:20px;color:#333;font-size:14px;line-height:1.6;">
          ${html}
        </div>
        
        <!-- Footer -->
        <div style="background:#f8f9fa;padding:15px;text-align:center;font-size:12px;color:#777;">
          <p>&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
          <p>
            <a href="https://yourdomain.com" style="color:#007bff;text-decoration:none;">Visit our website</a>
          </p>
        </div>
      </div>
    `;

    // ✅ store result in "info"
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html: wrappedHtml,
    });

    console.log(`✅ Email sent successfully to ${to}: ${info.messageId}`);
  } catch (err) {
    console.error("❌ Email sending error:", err);
  }
};




// export const sendEmail = async (to, subject, html) => {
//   try {
//     console.log("to:",to)
//     const testAccount= await nodemailer.createTestAccount();
//     const transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // upgrade later with STARTTLS
//     auth: {
//       user: 'lue.cassin95@ethereal.email',
//         pass: 'UBYTdKvJqgQ4TCTCFT'
//     },
//   });

//     let info= await transporter.sendMail({
//       from: `"Tailor Platform" <lue.cassin95@ethereal.email>`,
//       to,
//       subject,
//       html,
//     });

//     console.log(`📧 Email sent to`,info);
//   } catch (err) {
//     console.error(`❌ Email sending failed ${to}:`, err);
//   }
// };
