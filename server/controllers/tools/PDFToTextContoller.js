
const pdfParse = require('pdf-parse');

module.exports.Text = async (req,res)=> {
  try {
    const uploadedFile = req.file;
    const data = await pdfParse(uploadedFile.path);

    const text = data.text;
    res.status(200).send(text)
    // res.send(text);
  } catch (error) {
    res.status(500).send('Error processing the file');
  }
}