import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios"
import { useNavigate } from "react-router-dom"
// import Header from '../Header';

const Register = () => {

    //assign variables to name files.
    const [fname, setFName] = useState("");
    const [tname, setTName] = useState("");
    const [dname, setDName] = useState("");

    // //assign variables to upload files.
    const [file, setFile] = useState("");

    const [statusf] = useState(1);

    const history = useNavigate();

    const setimgfile = (e) => {
        setFile(e.target.files[0])
        //console.log(e.target.files[0]) //check if file appear in the console.
    }

    //add photo to list
    const addUserData = async (e) => {
        e.preventDefault();

        var formData = new FormData();
        formData.append("photo", file)
        formData.append("fname", fname)
        formData.append("tname", tname)
        formData.append("dname", dname)
        formData.append("status", statusf)

        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }

        const res = await axios.post("/register", formData, config)
        console.log(res)

        //return to home pageWeb
        if (res.data.status === 201) {
            history("/home")
        } else {
            console.log("error")
        }
    }

    return (
        <>
            {/* <Header /> */}
            <div className='container mt-3'>
                <h1>Upload Your File Here</h1>

                <Form>
                    <Form.Group className="mb-3" controlId="formControlInput1">
                        <Form.Label>Topic</Form.Label>
                        <Form.Control type="text" name='tname' placeholder='topic' onChange={(e) => setTName(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>FileName</Form.Label>
                        <Form.Control type="text" name='fname' placeholder='filename' onChange={(e) => setFName(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Select Your File</Form.Label>
                        <Form.Control type="file" name='photo' accept=".pdf" onChange={setimgfile} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formControlTextarea1">
                        <Form.Label>Detail</Form.Label>
                        <Form.Control type='text' name='dname' row={3} onChange={(e) => setDName(e.target.value)} />

                    </Form.Group>

                    <Button className="mb-2" variant="primary" type="submit" onClick={addUserData} >
                        Submit
                    </Button>
                </Form>
            </div>
        </>
    )
}

export default Register