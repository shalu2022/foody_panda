const nodemailer = require('nodemailer')

const sendMail = async (to, subject, content) =>{

    let transporter = nodemailer.createTransport({
        service: "gmail",
        host: 'smpt.gmail.com',
        port: 465,
        auth: {
            user: 'foodypanda22@gmail.com',
            pass: process.env.PASS
        }
    });

    const info = await transporter.sendMail({
        to,
        from: 'foodypanda22@gmail.com',
        subject,
        html: `<div>${content}</div>`
    });
    return info;
};

module.exports = sendMail