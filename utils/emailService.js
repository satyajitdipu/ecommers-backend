const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

const sendEmail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: '"eCommerce Store" <noreply@store.com>',
      to,
      subject,
      html
    });
    console.log('📧 Email sent to', to);
  } catch (error) {
    console.error('❌ Email send error:', error);
  }
};

module.exports = sendEmail;
