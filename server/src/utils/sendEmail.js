const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const sendEmail = async (to, subject, text) => {
    const transporter = nodemailer.createTransport({
       service: "gmail",
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    let mailOptions = {
        from: '"Learn With Sensei" <${process.env.EMAIL_USERNAME}>', // Replace with your email
        to: to,
        subject: subject,
        html: text, // Ensure this is set to the HTML content
    };
    
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.response}`);
        return true;
    } catch (error) {
        console.error(`Error sending email: ${error}`);
        return false;
    }
    // const info = await transporter.sendMail({
    //     from: '"Education hub" <${process.env.EMAIL_USERNAME}>',
    //     to: to,
    //     subject: subject,
    //     text: text
    // });

   
}


module.exports = {sendEmail}


