const bcrypt = require("bcrypt");
const User = require("../db/models/user.model");
const status = require("../enums/UserStatus");
const path = require("path")

const { randomString } = require("../utils/random");
const { verifyEmail } = require("../utils/sendEmail");

module.exports.Register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const useremail = await User.findOne({ email: email });
    const user_username = await User.findOne({ username: username });

    if (useremail || user_username) {
      res.status(400).json({ message: "User Already Exists" });
    } else {
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);
      const code = randomString(20);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        verification: code,
      });
      await newUser.save();
      const link = `http://localhost:8080/api/verify?code=${code}`;
      verifyEmail(email, username, link);
      return res.status(201).json({ message: "User Created" });
    }
  } catch (error) {
    res.status(500);
  }
};

module.exports.Verify = async (req, res) => {
  const { code } = req.query;
  try {
    const user = await User.findOne({ verification: code });
    if (!user) {
      const filePath = path.join(__dirname, 'partials', 'failed.html');
      res.sendFile(filePath);
    }
    user.status = status.ACTIVE;
    user.verification = code;
    await user.save();
    const filePath = path.join(__dirname, 'partials', 'verify.html');
    res.sendFile(filePath);
    } catch (error) {
    res.status(500);
  }
};

module.exports.Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (user.status !== "ACTIVE") {
        res.status(401).json({ message: "not verified" });
      }
      if (isMatch) {
        const token = await user.generateAuthToken();
        res.cookie("Authtoken", token, {
          expires: new Date(Date.now() + 2592000000),
          httpOnly: false,
        });
        res.status(200).json({
          message: "Login Success",
          userId: user._id,
        });
      } else {
        res.status(400).json({ message: "Invalid Credentials" });
      }
    } else {
      res.status(400).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(500);
  }
};



module.exports.ResetPassword = async (req, res) => {
  const { userId } = req.body;
  const { password } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    let newPassword = password.toString();
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;
    await user.save();
    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// module.exports.ForgotPassword = async (req, res) => {
//   const { userId } = req.body;
//   const { password } = req.body;
//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(401).json({ message: "User not found" });
//     }
//     let newPassword = password.toString();
//     const hashedPassword = await bcrypt.hash(newPassword, 12);
//     user.password = hashedPassword;
//     await user.save();
//     return res.status(200).json({ message: "Password reset successfully" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

