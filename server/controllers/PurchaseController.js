const User = require('../db/models/user.model')


module.exports.PurchseCredits = async (req,res) => {
    const { userId, purchasedTokens } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.credits += purchasedTokens;
    await user.save();

    return res.status(200).json({ message: 'Tokens added successfully', tokens: user.credits });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to add tokens', error: error.message });
  }
}