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
    const { tname, fname, dname } = req.body;
    const { filename } = req.file;
    const { status } = req.body;

    if (!fname || !filename || !tname || !dname || !status) {
        res.status(422).json({ status: 422, message: "fill all the details" })
    }

    try {

        let date = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

        conn.query("INSERT INTO usersdata SET ?", { topic: tname, username: fname, userfile: filename, decs: dname, status_id: status, date: date }, (err, result) => {
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
    // const page = req.query.page;
    // const items = req.query.items;

    try {
        conn.query("SELECT usersdata.id, usersdata.topic, usersdata.username, usersdata.date, usersdata.decs, usersdata.date_edit, statusfile.status_file FROM usersdata INNER JOIN statusfile on statusfile.id = usersdata.status_id",
            (err, result) => {
                if (err) {
                    console.log("error")
                } else {
                    console.log("data get")
                    res.status(201).json({ status: 201, data: result })
                    // if (page && items) {
                    //     page = page !== 'undefined' ? parseInt(page, 10) : undefined;
                    //     items = items !== 'undefined' ? parseInt(items, 10) : undefined;
                    //     res.status(200).json({ users: users.search(page, items) });
                    // } else {
                    //     console.log("error")
                    // }
                }
            })
    } catch (error) {
        res.status(422).json({ status: 422, error })
    }
})

//get data follow user
router.get("/getuser/:email", jsonParser, (req, res) => {
    const { email } = req.body;

    conn.query(`SELECT * FROM usersy WHERE email=?`, [email], (err, resemail) => {
        if (resemail) {
            res.json({data: resemail[0].id})
            const id_email = req.json(resemail[0].id)
        }
        // if (err) {
        //     console.log("error")
        // } else {
        //     console.log("get data user")
        //     // const id_email = res.json({data: result[0].id})
        //     // console.log(result[0].id)
        //     const id_email = resemail.id;
        //     try {
        //         conn.query(`SELECT * FROM usersdata WHERE usersy_id=?`, [id_email], (err, result) => {
        //             if (err) {
        //                 console.log("error")
        //             } else {
        //                 console.log("get data user2")
        //                 // console.log(result)
        //                 res.status(201).json({ status: 201, data: result })
        //             }
        //         })
        //     } catch (error) {
        //         // Access Denied
        //         return res.status(401).send(error);
        //     }

        // }
    })

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
        conn.query(`SELECT * FROM usersdata WHERE id=?`, [id], (err, result) => {
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

        conn.query("UPDATE usersdata SET userfile = ?, status_id = ?, date_edit=? WHERE id = ?", [filename, status, dateedit, id], (err, result) => {
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

//status
// router.put("/status/:id", (req, res) => {
//     const { id } = req.params;
//     const { status } = req.body;
//     try {
//         conn.query("UPDATE usersdata SET status_id = ? WHERE id = ?", [status, id], (err, result) => {
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