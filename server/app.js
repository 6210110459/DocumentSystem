const express = require('express');
const app = express();
require("./db/conn");
const cors = require("cors");
const router = require("./routes/router");
// const bodyParser = require('body-parser');
const port = 8004;


app.use(express.json());
app.use(cors());
// app.use(bodyParser.json())

app.use("/uploads",express.static("./uploads"))
app.use(router);


app.listen( port,()=>{
    console.log("server start")
})