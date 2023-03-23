import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';

const Fail = () => {

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
                    // alert('authen success')
                    // console.log(data.decode)
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

    const history = useNavigate();

    const upDateuser = async (e) => {
        //no refresh page
        e.preventDefault();

        var formData = new FormData(e.target);
        const jsonData = {
            faildata: formData.get('faildata'),
        }
        
        // formData.append("faildata", faildata)
        // formData.append("statuss", 4)
        
        const configg = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const res = await axios.post(`/fail/${id}`, JSON.stringify(jsonData), configg)
        console.log(res)

        //return to home pageWeb
        if (res.data.status === 201) {
            history("/admin/home")
            console.log("update fail data")
        } else {
            console.log("error")
        }
    }

    return (
        <>
            <div className='container mt-3'>
                <h1 className='text-center mt-2'>Mistake Your File Here</h1>


                {
                    updata.map((el) => {
                        return (
                            <>
                                <div className='container mt-3'>
                                    <Card style={{ width: '100%' }} className='mt-2' >
                                        <Card.Header as="h5" className='bg-dark text-white'>{el.ffname} {el.llname}</Card.Header>
                                        <Card.Body>
                                            <Card.Title>{el.topic}</Card.Title>
                                            <Card.Text>
                                                {el.decs}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </div>

                            </>
                        )
                    })

                }

                <div className='container mt-3'>
                    <Form onSubmit={upDateuser}>
                        <Form.Group className="mb-3" controlId="formControlTextarea1">
                            <Form.Label>Detail</Form.Label>
                            <Form.Control as="textarea" rows={3} name='faildata' />
                        </Form.Group>

                        <Button className="mb-2" variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>

                </div>

            </div>
        </>
    )
}

export default Fail