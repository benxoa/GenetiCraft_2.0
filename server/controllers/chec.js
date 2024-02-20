const axios = require('axios');
const FormData = require('form-data');

module.exports.check = async (req,res)=> {
    const data = new FormData();
data.append('pdf', );

const options = {
  method: 'POST',
  url: 'https://pdf-to-text-convert.p.rapidapi.com/pdf-to-text',
  headers: {
    'X-RapidAPI-Key': 'ff07797395msh61d5341b2135ef0p1a7425jsn27c1c4ee099b',
    'X-RapidAPI-Host': 'pdf-to-text-convert.p.rapidapi.com',
    ...data.getHeaders(),
  },
  data: data
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}
}
