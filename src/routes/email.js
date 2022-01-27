import { GmailTransporter, SendinblueSMTPTransporter } from '../services/email';
import EmailTemplate from 'email-templates';

require('dotenv').config();

const environment = process.env;

export const sendContactSupportEmail = (req, res) => {
  const { name, title, email, text } = req.body;

  const template = new EmailTemplate({
    message: {
      from: email,
    },
    transport: SendinblueSMTPTransporter,
    send: true,
  });


  const mailOptions = {
    from: `${name} <${email}>`,
    to: environment.GMAIL_USER_NAME,
  };

  const context = {
    title,
    name,
    email,
    text,
  };

  template.send({
    template: 'support',
    message: mailOptions,
    locals: context,
  })
  .then(() => {
    console.log('Email sent');
    res.status(200).send({ message: 'Email sent' });
  })
  .catch(err => {
    console.log(err);
    res.status(400).send({ message: "Something went wrong" })
  });
};