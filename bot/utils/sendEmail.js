import nodemailer from "nodemailer";
const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASS,
      },
    });

     const options = {
       from: `"${process.env.EMAIL_ID}" <${process.env.EMAIL_ID}>`,
       to,
       subject,
       html: text,
     };

    await transporter.sendMail(options);
    return { status: true, message: `:) Email Sent Successfully to ${to}` };
  } catch (error) {
    console.log(error.message);
    return { status: false, message: ":( Email Failed to send" };
  }
};

export default sendEmail;
