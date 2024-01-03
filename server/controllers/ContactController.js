const Contact = require("../db/models/contact.model");

module.exports.Contact = async (req, res) => {
  const { email, subject, message } = req.body;
  try {
    const contact = new Contact({ email, subject, message });
    await contact.save();
    res.status(201).json({ message: 'Contact created successfully' });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};