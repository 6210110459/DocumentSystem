const express = require('express');
const router = new express.Router();
const conn = require("../db/conn");
const multer = require("multer");
const moment = require("moment");


// file storage confing
var fileconfig = multer.diskStorage({
    destination:(req,file,callback) => {
        //Store uploaded files
        callback(null,"./uploads");
    },
    filename:(req,file,callback) => {
        callback(null, `image-${Date.now()}.${file.originalname}`)
    }
});


//file filter
const isFile = (req,file,callback) => {
    if(file.mimetype.startsWith("image")){
        callback(null,true)
    } else {
        callback(null,Error("only file is allowd"))
    }
}

var upload = multer({
    storage:fileconfig,
    fileFilter:isFile
})


// register userdata
router.post("/register", upload.single("photo"),(req,res) => {
    const {fname} = req.body;
    const {filename} = req.file;

    if(!fname || !filename){
        res.status(422).json({status:422 ,message: "fill all the details"})
    }

    try {
        let date = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
        conn.query("INSERT INTO userdata SET ?", {username:fname, userfile:filename,  date:date}, (err,result) => {
            if (err) {
                console.log("error")
            } else {
                console.log("data added")
                res.status(201).json({status:201, data:req.body})
            }
        })
    } catch (error) {
        res.status(422).json({status:422, error})
    }
})


module.exports = router;