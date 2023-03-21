const express = require('express');
const router = new express.Router();
const conn = require("../db/conn");
const multer = require("multer");
const moment = require("moment");

const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const bcrypt = require("bcrypt");
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const secret = 'DocumentSystem'

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
    const { tname, dname } = req.body;
    const { filename } = req.file;
    const { status, user } = req.body;

    if ( !filename || !tname || !dname || !status || !user) {
        res.status(422).json({ status: 422, message: "fill all the details" })
    }

    try {
        let date = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

        conn.query("INSERT INTO usersdata SET ?", { topic: tname, userfile: filename, decs: dname, status_id: status, date: date, usersy_id:user }, (err, result) => {
            if (err) {
                console.log("error noconnect")
                res.json({ message: err })
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
        conn.query(`SELECT usersdata.id, usersdata.topic, usersdata.userfile, usersdata.date, usersdata.date_edit, usersdata.decs, statusfile.status_file, usersy.ffname, usersy.llname 
        FROM usersdata 
        inner join statusfile on statusfile.id = usersdata.status_id 
        inner join usersy on usersy.id = usersdata.usersy_id`,
            (err, result) => {
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

//get data follow user
router.get("/getdata/:id", jsonParser, (req, res) => {
    const { id } = req.params;

    try {
        conn.query(`SELECT usersdata.id, usersdata.topic, usersdata.userfile, usersdata.date, usersdata.date_edit, usersdata.decs, statusfile.status_file, usersy.ffname, usersy.llname 
        FROM usersdata 
        inner join statusfile on statusfile.id = usersdata.status_id 
        inner join usersy on usersy.id = usersdata.usersy_id WHERE usersy_id=?`, [id], (err, result) => {
            if (err) {
                console.log("error")
            } else {
                console.log("data get id")
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
router.get("/induser/:id", jsonParser, (req, res) => {
    const { id } = req.params;
    try {
        conn.query(`SELECT usersdata.id, usersdata.topic, usersdata.userfile, usersdata.decs, usersdata.status_id, usersdata.decs_fail, usersy.ffname, usersy.llname, usersy.roleuser from usersdata  inner join usersy on usersy.id = usersdata.usersy_id where usersdata.id = ?`, [id], (err, result) => {
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
router.put("/update/:id", upload.single("photo"), (req, res) => {
    const { id } = req.params;
    const { filename } = req.file;
    const { status } = req.body;
    
    try {
        let dateedit = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

        conn.query("UPDATE usersdata SET userfile = ?, status_id = ?, date_edit=? WHERE usersdata.id = ?", [filename, status, dateedit, id], (err, result) => {
            if (err) {
                console.log("error")
            } else {
                console.log("update data")
                res.status(201).json({ status: 201, data: result })
            }
        })
    } catch (error) {
        res.status(422).json({ status: 422, error })
    }

})

router.post("/update2/:id", upload.single("photo"), (req, res) => {
    const { id } = req.params;
    const { filename } = req.file;
    const { status, editdata } = req.body;
    
    if ( !filename || !editdata ) {
        res.status('false').json({ status: 'false', message: "fill all the details" })
    }

    try {
        let dateedit = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

        conn.query("UPDATE usersdata SET userfile = ?, status_id = ?, date_edit=?, decs=? WHERE usersdata.id = ?", [filename, status, dateedit, editdata, id], (err, result) => {
            if (err) {
                console.log("error")
            } else {
                console.log("update data")
                res.status(201).json({ status: 201, data: result })
            }
        })
    } catch (error) {
        res.status(422).json({ status: 422, error })
    }

})

//fail data
router.post("/fail/:id", jsonParser, (req, res) => {
    const { id } = req.params;
    const { faildata } = req.body;
    try {
        let dateedit = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

        conn.query("UPDATE usersdata SET status_id=?, date_edit=?, decs_fail=? WHERE id=?", [4, dateedit, faildata, id], 
        (err, result) => {
            if (err) {
                console.log("error")
            } else {
                console.log("update fail data")
                res.status(201).json({ status: 201, data: req.body })
            }
        })
    } catch (error) {
        res.status(422).json({ status: 422, error })
    }

})

//status
// router.post("/status/:id", (req, res) => {
//     const { id } = req.params;

//     try {
//         conn.query("UPDATE usersdata SET status_id = ? WHERE id = ?", [2, id], (err, result) => {
//             if (err) {
//                 console.log("error")
//             } else {
//                 console.log("changed status")
//                 res.status(201).json({ status: 201, data: result })
//             }
//         })
//     } catch (error) {
//         res.status(422).json({ status: 422, error })
//     }
// })

//sign in
router.post('/registeruser', jsonParser, function (req, res, next) {
    // const { email, ffname, llname, passwords, roleuser } = req.body;

    bcrypt.hash(req.body.passwords, saltRounds, function (err, hash) {
        conn.query('INSERT INTO usersy (ffname, llname, email, passwords, roleuser) VALUES (?, ?, ?, ?, ?)',
            [req.body.ffname, req.body.llname, req.body.email, hash, req.body.roleuser],
            function (err, result, fields) {
                if (err) {
                    res.json({ status: 'error', message: err })
                    return
                }
                res.json({ status: 'OK' })
            })
    });
})

router.post('/loginuser', jsonParser, function (req, res, next) {
    // const { email, ffname, llname, passwords, roleuser } = req.body;

    conn.query('SELECT * FROM usersy WHERE email=?', [req.body.email], function (err, users, fields) {
        if (err) {
            res.json({ status: 'error', message: err });
            return
        }
        if (users.length == 0) {
            res.json({ status: 'error', message: 'no user found' });
            return
        }
        bcrypt.compare(req.body.passwords, users[0].passwords, function (err, isLogin) {
            if (isLogin) {
                var token = jwt.sign({ email: users[0].email }, secret, { expiresIn: '1h' });
                res.json({ status: 'ok', message: 'login success', token, data: users })

            } else {
                res.json({ status: 'error', message: 'login failed' })
            }
        });
        // res.json({ status: 'OK' })
    })
})

router.post('/authuser', jsonParser, function (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1]
        var decoded = jwt.verify(token, secret);
        res.json({ status: 'ok', decoded })
        // res.json({ decoded })
    } catch (error) {
        res.json({ status: 'error', message: err })
    }

})

//get userRole
router.get('/getrole', jsonParser, (req, res) => {

    try {
        const token = req.headers.authorization.split(' ')[1]

        const verified = jwt.verify(token, secret);
        if (verified) {
            // return res.json(verified);
            conn.query(`SELECT * FROM usersy WHERE email=?`, [verified.email], (err, result) => {
                if (err) {
                    console.log("error")
                } else {
                    console.log("username show")
                    res.status(201).json({ status: 201, data: result })
                }
            })
        } else {
            // Access Denied
            return res.status(401).send(error);
        }
    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }

})

//status faile
// router.put('/postdecs/id', (req,res) => {
//     const { id } = req.params;
//     const { status, decs } = req.body;
// })

module.exports = router;