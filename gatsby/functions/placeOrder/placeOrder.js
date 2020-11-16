const nodemailer = require('nodemailer');

const { MAIL_HOST, MAIL_USER, MAIL_PASS } = process.env;
// create a transport for nodemailer
const transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  port: 587,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
});

exports.handler = async (event, context) => {
  // test send an email
  const info = await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: 'orders@example.com',
    subject: 'New order!',
    html: `<p>Your new pizza order is here!</p>`,
  });

  console.log(info);

  return {
    statusCode: 200,
    body: JSON.stringify(info),
  };
};
