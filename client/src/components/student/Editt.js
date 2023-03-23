import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';

const Editt = () => {

    const { id } = useParams("");

    const [updata, setUpData] = useState([]);
    // console.log(updata)

    const getUserData2 = async (id) => {
        const res = await axios.get(`/induser/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (res.data.status === 201) {
            setUpData(res.data.data)
            console.log("data show");
        } else {
            console.log("error")
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token')

        fetch("http://localhost:8004/authuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'ok') {
                    getUserData2(id)
                } else {
                    alert('authen failed')
                    localStorage.removeItem('token')
                    window.location = "/"
                }
            })
            .catch((error) => {
                console.error("Error:", error)
            });

    }, [id])

    const [file, setFile] = useState("");
    const [editdata, setEdit] = useState("");

    const history = useNavigate();

    const setimgfile = (e) => {
        setFile(e.target.files[0])
    }

    const upDateuser = async (e) => {
        //no refresh page
        e.preventDefault();

        var formData = new FormData();
        formData.append("photo", file)
        formData.append("status", 1)
        formData.append("editdata", editdata)

        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }

        const res = await axios.post(`/update2/${id}`, formData, config)
        console.log(res)

        //return to home pageWeb
        if (res.data.status === 201) {
            history("/home")
            console.log("edit data")
        } else if (res.data.status === 'false') {
            alert('กรอกข้อมูลให้ครบด้วยค่ะ')
        } else {
            console.log("error")
        }
    }

    return (
        <>
            <div className='container mt-3'>
                <h1 className='text-center mt-2'>Edit Your File Here</h1>


                {
                    updata.map((el) => {
                        return (
                            <>
                                <div className='container mt-3'>
                                    <Card style={{ width: '100%' }} className='mt-2' >
                                        <Card.Header as="h5">{el.topic}</Card.Header>
                                        <Card.Body>
                                            <Card.Text>
                                                {el.decs}
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer>
                                            <Card.Subtitle>หมายเหตุ: {el.decs_fail}</Card.Subtitle>
                                        </Card.Footer>
                                    </Card>
                                </div>

                            </>
                        )
                    })

                }

                <div className='container mt-3'>
                    <Form >
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Select Your File</Form.Label>
                            <Form.Control type="file" name='photo' accept=".pdf" onChange={setimgfile} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formControlTextarea1">
                            <Form.Label>Detail: แจ้งรายละเอียดต่างๆ </Form.Label>
                            <Form.Control as="textarea" rows={3} name='editdata' onChange={(e) => setEdit(e.target.value)} />
                        </Form.Group>

                        <Button className="mb-2" variant="primary" type="submit" onClick={upDateuser} >
                            Submit
                        </Button>
                    </Form>

                </div>

            </div>
        </>
    )
}

export default Editt