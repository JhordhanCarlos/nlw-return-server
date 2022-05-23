import { MailAdapter, SendMailData } from "../MailAdapter"
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "dabec6067a4c65",
      pass: "5a76b1b157b711"
    }
});

export class NodemailerMailAdapter implements MailAdapter{
    async sendMail({subject, body} : SendMailData){
        await transport.sendMail({
            from:'Equipe Feedget <oi@feedget.com>',
            to: 'Jhordhan Carlos <jhordhanjf@gmail.com>',
            subject: subject,
            html: body
        })
    }
}