const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAILPASSWORD,
    },
});

async function SendMail(email, subject, body) {

    console.log("sending email... ")

    let info = await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: subject,
        html: body,
    });

    console.log("email status", info)
}

async function SendBOUserAccountCreationEmail(email, name, defaultPassword) {
    console.log(__dirname)
    const htmlPath = path.join(__dirname, "..", "resources", "newAdminUserRegistration.html");
    const html = fs.readFileSync(htmlPath, "utf8")
        .replace("{{username}}", name)
        .replace("{{password}}", defaultPassword);
    
    await SendMail(email, "You have invited as Back office user to HolidayCentral portal", html)
   
}


module.exports = {
    SendBOUserAccountCreationEmail
}