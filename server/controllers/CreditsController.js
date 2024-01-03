const User = require("../db/models/user.model");

module.exports.Credits = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const credits = await user.credits
    res.status(200).json({ credits: credits})
  } catch (error) {
    res.status(500)
  }
};
