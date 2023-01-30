const sendEmail = require("./sendEmail");

const sendResetPasswordEmail = async ({ name, email, token, origin }) => {
  const resetURL = `${origin}/reset-password?token=${token}&email=${email}`;
  const message = `<p>
  PLease reset password by clicking the following link 
 <a href="${resetURL}">Reset Email</a>
 </p>
 `;
  return sendEmail({
    to: email,
    subject: "Reset Password",
    html: `<h4>Hello, ${name} </h4>
    <p>${message}</p>`,
  });
};

module.exports = sendResetPasswordEmail;
