import nodemailer from "nodemailer";
import dotenv from 'dotenv';
import Mailgen from "mailgen";

export const mailSender = (userEmail, subject, username, reset) => {
    return new Promise((resolve, reject) => {
        // const { userEmail } = req.body;
        const EMAIL = process.env.MAIL_ID
        const PASSWORD = process.env.MAIL_PASSWORD
        console.log(EMAIL, userEmail)

        let config = {
            service: 'gmail',
            auth: {
                user: EMAIL,
                pass: PASSWORD
            }
        }
        let transporter = nodemailer.createTransport(config);

        let MailGenerator = new Mailgen({
            theme: "default",
            product: {
                name: "Socialbuzz",
                link: 'https://mailgen.js/',
                // logo:'/socialbuzzlogo.png'
            }
        })

        let emailResponseVerify = {
            body: {
                name: username,
                intro: 'Welcome to Socialbuzz! We\'re very excited to have you on board.',
                action: {
                    instructions: 'To get started with Socialbuzz, please click here:',
                    button: {
                        color: '#22BC66', // Optional action button color
                        text: 'Confirm your account',
                        link: subject
                    }
                },
                outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
            }
        }

        let emailResponseResetpassword = {
            body: {
                name: username,
                intro: 'Welcome to Socialbuzz! We\'re very excited to have you on board.',
                action: {
                    instructions: 'To reset your password, please click here:',
                    button: {
                        color: '#22BC66', // Optional action button color
                        text: 'Confirm your account',
                        link: subject
                    }
                },
                outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
            }
        };
        
        let mail = reset ? MailGenerator.generate(emailResponseResetpassword) : MailGenerator.generate(emailResponseVerify)
        let message = {
            from: EMAIL,
            to: userEmail,
            subject: reset?"Reset passoword":"Account verifi",
            html: mail
        }


        transporter.sendMail(message).then(() => {
            resolve()
        }).catch(error => {
            reject(error)
        })
    })


}