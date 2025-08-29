export const tailorWelcomeEmail = (ownerName, businessName) => `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <h2 style="color:#4CAF50;">Welcome to Khyate!</h2>
    <p>Dear ${ownerName || "Tailor"},</p>
    <p>Thank you for joining us as a tailor${businessName ? ` at <b>${businessName}</b>` : ""}.</p>
    <p>
      We have successfully received your application and uploaded documents.
      Our team will carefully review them, and once verified, 
      we will share your login credentials.
    </p>
    <p style="margin-top:15px;">Meanwhile, feel free to reach out if you have any questions.</p>
    <p style="margin-top:20px;">Best Regards,<br/>The Tailor Platform Team</p>
    <hr/>
    <small>This is an automated email, please do not reply directly.</small>
  </div>
`;
