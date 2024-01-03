const axios = require("axios").default;
const fs = require('fs');
const pdfParse = require('pdf-parse');

module.exports.Speech = async (req, res) => {
  try {
    const {gender, lang } = req.body
    const uploadedFile = req.file;
    const data = await pdfParse(uploadedFile.path);
    const text = data.text;

    const options = {
      method: 'POST',
      url: 'https://api.edenai.run/v2/audio/text_to_speech',
      headers: {
        Authorization: `Bearer ${process.env.EDEN_API}`,
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        providers: 'google',
        language: lang,
        text: text,
        option: gender,
        fallback_providers: '',
      }),
    };

    const response = await axios.request(options);
    res.status(200).json({ message: response.data });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error processing the file');
  }
}
