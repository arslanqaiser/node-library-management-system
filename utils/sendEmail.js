import nodemailer from "nodemailer";

export const sendEmail = async ({ email, subject, message }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      service: process.env.SMTP_SERVICE,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  
    const mailOption = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject,
      html: message,
    };
  
    await transporter.sendMail(mailOption);
    
  } catch (error) {
    console.error("ERROR SENDING EMAIL", error.message);
    throw new Error("Email sending failed")
  }
  
};
