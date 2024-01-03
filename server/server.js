const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config({path: ".env"})
const port = process.env.PORT
require('./db/connection')
const path = require('path')




app.use(express.json({limit: '50mb'}));
// app.use(cors({
//   origin: "http://localhost:5173",
//   optionsSuccessStatus: 200,
//   credentials: true
// }))
app.use(cors({
  origin: ['https://www.geneticraft.fun'],
  credentials: true
}));
const router = require('./router/Router')
app.use("/api", router)




				
		


app.listen(port, ()=> {
    console.log(`The server listening at http://47.236.9.48:${port}`)
})
