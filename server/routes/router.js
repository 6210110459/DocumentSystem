const express = require('express');
const router = new express.Router();
const conn = require("../db/conn");
const multer = require("multer");
const moment = require("moment");
const bcrypt = require("bcrypt");
// const session = require("express-session");


// file storage confing
var fileconfig = multer.diskStorage({
    destination: (req, file, callback) => {
        //Store uploaded files
        callback(null, "./uploads");
    },
    filename: (req, file, callback) => {
        callback(null, `file-${Date.now()}.${file.originalname}`)
    }
});


//file filter
const isFile = (req, file, callback) => {
    if (file.mimetype.startsWith("image")) {
        callback(null, true)
    } else {
        callback(null, Error("only file is allowd"))
    }
}

var upload = multer({
    storage: fileconfig,
    fileFilter: isFile
})


// register userdata
router.post("/register", upload.single("photo"), (req, res) => {

    // console.log(req.body);
    const { tname, fname, dname} = req.body;
    const { filename } = req.file;

    if (!fname || !filename || !tname || !dname) {
        res.status(422).json({ status: 422, message: "fill all the details" })
    }

    try {

        let date = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

        conn.query("INSERT INTO usersdata SET ?", { topic: tname, username: fname, userfile: filename, decs: dname, date: date }, (err, result) => {
            if (err) {
                console.log("error")
            } else {
                console.log("data added")
                res.status(201).json({ status: 201, data: req.body })
            }
        })

    } catch (error) {
        console.log(error)
        res.status(422).json({ status: 422, error })
        return;
    }
})


// get user data
router.get("/getdata", (req, res) => {
    try {
        conn.query("SELECT * FROM usersdata", (err, result) => {
            if (err) {
                console.log("error")
            } else {
                console.log("data get")
                res.status(201).json({ status: 201, data: result })
            }
        })
    } catch (error) {
        res.status(422).json({ status: 422, error })
    }
})


// delete user
router.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    try {
        conn.query(`DELETE FROM usersdata WHERE id = '${id}'`, (err, result) => {
            if (err) {
                console.log("error")
            } else {
                console.log("data delete")
                res.status(201).json({ status: 201, data: result })
            }
        })
    } catch (error) {
        res.status(422).json({ status: 422, error })
    }
})

//get single user
router.get("/induser/:id", (req, res) => {
    const { id } = req.params;
    try {
        conn.query(`SELECT * FROM usersdata WHERE id=?`, [id],(err, result) => {
            if (err) {
                console.log("error")
            } else {
                console.log("data show")
                res.status(201).json({ status: 201, data: result })
            }
        })
    } catch (error) {
        res.status(422).json({ status: 422, error })
    }
})

//update userdata
router.post("/update/:id", (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
        conn.query("UPDATE usersdata SET ? WHERE id = ?", [data, id], (err, result) => {
            if (err) {
                console.log("error")
            } else {
                console.log("data get")
                res.status(201).json({ status: 201, data: result })
            }
        })
    } catch (error) {
        res.status(422).json({ status: 422, error })
    }

})

//sign in
// router.get("/signin", (req,res) => {
//     if (req.session.user) {
//         res.send({ loggedIn: true, user: req.session.user });
//       } else {
//         res.send({ loggedIn: false });
//       }
// })

router.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    conn.query("SELECT * FROM login WHERE username = ?", username, (err, result) => {
        if (err) {
            res.send({ err: err });
        }

        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (error, response) => {
              if (response) {
                // req.session.user = result;
                // console.log(req.session.user);
                res.send(result);
              } else {
                res.send({ message: "Wrong username/password combination!" });
              }
            });
          } else {
            res.send({ message: "User doesn't exist" });
          }
    })

})

module.exports = router;