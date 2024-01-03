const transporter = require("../config/EmailVerification");

const verifyEmail = async (email, username, link) => {
  return await transporter.sendMail({
    from: '"GenetiCraft Email Verification 🙌" service@geneticraft.fun',
    to: email,
    subject: "Confirm your email address ✔",
    text: "Hello world?", 
    html: `<div>
    <p>Dear ${username}</p>
    <p>Thank you for signing up for an account.....</p>

    <p>To complete your registreation, Please click on the link below....</p>
    <a href="${link}">Click Here to Verify</a>

    </div>`,
  });
};

// const ForgotEmail = async (email, username, link) => {
//   return await transporter.sendMail({
//     from: '"GenetiCraft Password Reset 🔑" service@geneticraft.fun',
//     to: email,
//     subject: "Reset your Password ✔",
//     text: "Hello world?", 
//     html: `<div>
//     <p>Dear ${username}</p>
//     <p>Thank you for signing up for an account.....</p>

//     <p>To complete your registreation, Please click on the link below....</p>
//     <a href="${link}">Click Here to Verify</a>

//     </div>`,
//   });
// };

module.exports = { verifyEmail };
