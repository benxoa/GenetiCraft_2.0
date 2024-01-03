const axios = require('axios').default;
const fs = require('fs');
const FormData = require('form-data');
module.exports.Translate = async (req,res) => {



    try {
    const { sourceLanguage, targetLanguage } = req.body;
    
    // const file = req.file;
    const fileStream = fs.createReadStream(req.file.path);

    // Read the file from the specified path
    // const files = fs.createReadStream(file);

    const form = new FormData();
    form.append('providers', 'google');
    form.append('file', fileStream);
    form.append('source_language', sourceLanguage);
    form.append('target_language', targetLanguage);
    form.append('fallback_providers', '');

    const options = {
      method: 'POST',
      url: 'https://api.edenai.run/v2/translation/document_translation',
      headers: {
        Authorization: `Bearer ${process.env.EDEN_API}`,
        'Content-Type': `multipart/form-data; boundary=${form.getBoundary()}`,
      },
      data: form,
    };

    const response = await axios.request(options);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred during translation.' });
  }



}