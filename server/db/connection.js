const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO)
.then(()=> console.log("MongoDb Connected"))
.catch(()=> console.log("MongoDb Failed!"))