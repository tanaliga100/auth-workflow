const nodemailer = require("nodemailer");
const nodemailerConfig = require("./nodeMailerConfig");
const sendEmail = async ({ to, subject, html }) => {
  let testAccount = await nodemailer.createTestAccount();
  // from ethereal
  const transporter = nodemailer.createTransport(nodemailerConfig);
  // send mail with defined transport object
  return transporter.sendMail({
    from: '"JordanTanaliga100" <jordantanaliga@gmail.com>', // sender address
    to,
    subject,
    html,
  });
};
module.exports = sendEmail;
