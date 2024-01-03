const User = require("../db/models/user.model");

module.exports.DetuctCredits = async (req,res)=> {
    try {
    const { userId, amount } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.credits < amount) {
      return res.status(400).json({ message: 'Insufficient credits' });
    }
    user.credits -= amount;
    await user.save();
    return res.status(200).json({ message: 'Credits deducted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}