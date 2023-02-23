import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import { NavLink } from "react-router-dom"
// import Card from 'react-bootstrap/Card';
import axios from 'axios';
// import moment from "moment"
import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
// import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Home = () => {

    const [data, setData] = useState([]);

    const [show, setShow] = useState(false);

    const getUserData = async () => {
        const res = await axios.get("/getdata", {
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (res.data.status === 201) {
            console.log("data get");
            setData(res.data.data)

        } else {
            console.log("error")

        }
    }

    const dltUser = async (id) => {
        //connect to backEnd
        console.log(id)
        const res = await axios.delete(`/delete/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (res.data.status === 201) {
            getUserData()
            setShow(true)
            // setGet(true)
        } else {
            console.log("error")
        }
    }

    useEffect(() => {
        getUserData()
    }, [])

    return (
        <>
            {
                show ? <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                    User Delete
                </Alert> : ""
            }

            <div className="container mt-3">
                <h1 className='text-center mt-2'>Document Upload Projects With Mysql database</h1>

                <div className='text-end'>
                    <Button variant="primary"><NavLink to="/register" className="text-decoration-none text-light"> Add User</NavLink></Button>
                </div>

                <div className='d-flex align-iteams-center mt-5'>
                    <Table bordered hover>
                        <thead>
                            <tr className="table-dark">
                                <th>#</th>
                                <th>Topic</th>
                                <th>Action</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((el, id) => {
                                    return (
                                        <>
                                            <tr>
                                                <th>{id + 1}</th>
                                                <td>{el.topic}</td>
                                                <td>{el.username}</td>
                                                <td>
                                                    {
                                                        data.length > 0 ?
                                                            <Alert variant="success" >
                                                                Submitted
                                                            </Alert> : ""
                                                    }
                                                </td>
                                                <td className="d-flex justify-content-evenly">
                                                    <NavLink to={`detail/${el.id}`}><button className="btn btn-success"><RemoveRedEyeIcon /></button></NavLink>
                                                    {/* <NavLink to={`edit/${el.id}`}><button className="btn btn-primary"><EditIcon /></button></NavLink> */}
                                                    <button className="btn btn-danger" onClick={() => dltUser(el.id)}><DeleteIcon /></button>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                            {/* <tr>
                                <td>1</td>
                                <td>การยื่นเรื่องคำร้อง 1</td>
                                <td>
                                    {
                                        data.length > 0 ? data.map((el) => {
                                            return (
                                                <>
                                                    <p className='text-center'>{el.username}, {moment(el.date).format("DD-MM-YYYY-hh:mm")}</p>
                                                    <Button variant="danger" onClick={() => dltUser(el.id)} className='align-iteams-center text-center'>Delete</Button>
                                                </>
                                            )
                                        }) : ""
                                    }
                                </td>
                                <td>
                                    {
                                        data.length > 0 ?
                                            <Alert variant="success" >
                                                Submitted
                                            </Alert> : <Alert variant="info">
                                                Opened
                                            </Alert>
                                    }
                                </td>
                            </tr> */}
                            {/* <tr>
                                <td>2</td>
                                <td>การยื่นเรื่องคำร้อง 1</td>
                                <td>621011XXX</td>
                                <td>
                                    <Alert variant="success">
                                        Submitted
                                    </Alert>
                                </td>
                                <td className="d-flex justify-content-evenly">
                                    <button className="btn btn-success"><RemoveRedEyeIcon /></button>
                                    <button className="btn btn-primary"><EditIcon /></button>
                                    <button className="btn btn-danger"><DeleteIcon /></button>
                                </td>
                            </tr> */}
                        </tbody>
                    </Table>
                </div>

                {/* <div className='d-flex justify-content-between align-iteams-center mt-5'>
                    {
                        //add card will upload
                        data.length > 0 ? data.map((el, i) => {
                            return (
                                <>
                                    <Card style={{ width: '22rem', height: '18rem' }} className='mb-3'>
                                        <Card.Img variant="top" src="/pdficon2.png" style={{ width: '100px', textAlign: 'center', margin: 'auto' }} className='mb-2' />
                                        <Card.Body className='text-center'>
                                            <Card.Title>UserName : {el.username}</Card.Title>
                                            <Card.Text>
                                                Date Added : {moment(el.date).format("DD-MM-YYYY")}
                                            </Card.Text>
                                            <Button variant="danger" onClick={() => dltUser(el.id)} className='col-lg-6 text-center'>Delete</Button>
                                        </Card.Body>
                                    </Card>
                                </>
                            )
                        }) : ""
                    }
                </div> */}



            </div>
        </>
    )
}

export default Home