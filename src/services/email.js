import nodemailer from 'nodemailer';
import smtp from 'nodemailer-smtp-transport';

require('dotenv').config();

const environment = process.env;

export const GmailTransporter = nodemailer.createTransport({
  service: environment.GMAIL_SERVICE_NAME,
  host: environment.GMAIL_SERVICE_HOST,
  secure:environment.GMAIL_SERVICE_SECURE,
  port: environment.GMAIL_SERVICE_PORT,
  auth: {
    user: environment.GMAIL_USER_NAME,
    pass: environment.GMAIL_USER_PASSWORD
  }
});

export const MailjetSMTPTransporter = nodemailer.createTransport(smtp({
  service: environment.MAILJET_SMTP_SERVICE_NAME,
  host: environment.MAILJET_SMTP_SERVICE_HOST,
  port: environment.MAILJET_SMTP_SERVICE_PORT,
  auth: {
      user: environment.MAILJET_SMTP_USER_NAME,
      pass: environment.MAILJET_SMTP_USER_PASSWORD
  }
}));

export const SendinblueSMTPTransporter = nodemailer.createTransport(smtp({
  service: environment.SENDINBLUE_SMTP_SERVICE_NAME,
  host: environment.SENDINBLUE_SMTP_SERVICE_HOST,
  port: environment.SENDINBLUE_SMTP_SERVICE_PORT,
  auth: {
      user: environment.SENDINBLUE_SMTP_USER_NAME,
      pass: environment.SENDINBLUE_SMTP_USER_PASSWORD
  }
}));