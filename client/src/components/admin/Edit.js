import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';

const Edit = () => {

    const { id } = useParams("");

    const [updata, setUpData] = useState([]);
    console.log(updata)

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
        getUserData2(id)
    }, [id])

    const [file, setFile] = useState("");

    const history = useNavigate();

    const setimgfile = (e) => {
        setFile(e.target.files[0])
        //console.log(e.target.files[0]) //check if file appear in the console.
    }

    const upDateuser = async (e) => {
        //no refresh page
        e.preventDefault();

        var formData = new FormData();
        formData.append("photo", file)
        formData.append("status", 3)

        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }

        const res = await axios.put(`/update/${id}`, formData, config)
        console.log(res)

        //return to home pageWeb
        if (res.data.status === 201) {
            history("/admin/home")
            console.log("update data")
        } else {
            console.log("error")
        }
    }

    // const [editdata] = useState(3);

    // const setCheckbox = async(e) => {
 
    // }

    return (
        <>
            <div className='container mt-3'>
                <h1>Update Your File Here</h1>


                {
                    updata.map((el) => {
                        return (
                            <>
                                <div className='container mt-3'>
                                    <Card style={{ width: '100%' }} className='mt-2' >
                                        <Card.Header as="h5">{el.username}</Card.Header>
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
                    <Form >
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Select Your File</Form.Label>
                            <Form.Control type="file" name='photo' accept=".pdf" onChange={setimgfile} />
                        </Form.Group>

                        {/* <Form.Group className="mb-3">
                            <Form.Check
                                type="checkbox"
                                id="edit"
                                label="Edit to File"
                                onChange={(e) => setEditData(e.target.checked)}
                            />
                        </Form.Group> */}

                        <Button className="mb-2" variant="primary" type="submit" onClick={upDateuser} >
                            Submit
                        </Button>
                    </Form>

                </div>

            </div>
        </>
    )
}

export default Edit