import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/esm/Table';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Chip from '@mui/material/Chip';
// import Button from 'react-bootstrap/Button';
import { NavLink } from "react-router-dom";
// import Form from 'react-bootstrap/Form';
import moment from "moment";


const Homee = () => {
    const [data, setData] = useState([]);
    console.log(data);

    const getData = async () => {
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
                    getData()
                } else {
                    alert('authen failed')
                    localStorage.removeItem('token')
                    window.location = "/"
                }
            })
            .catch((error) => {
                console.error("Error:", error)
            });
    }, [])

    return (
        <>
            <div className='container mt-2'>
                <h1 className='text-center mt-5'>Document Upload Projects With Mysql database</h1>

                {/* <div className="search mt-2">
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="primary" className='search_btn'>Search</Button>
                    </Form>
                </div> */}

                <div className='align-iteams-center mt-5'>
                    <Table hover responsive="sm">
                        <thead>
                            <tr className="table-dark">
                                <th>#</th>
                                <th>Topic</th>
                                <th>name</th>
                                <th>Status</th>
                                <th>Date Added</th>
                                <th>Date Status</th>
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
                                                <td>{el.ffname} {el.llname}</td>
                                                <td>
                                                    <Chip label={el.status_file}
                                                        color={el.status_file === 'รอการดำเนิน' ? 'warning' :
                                                            el.status_file ==='เอกสารไม่สำเร็จ' ? 'error' : 
                                                            el.status_file === 'เอกสารสำเร็จ' ? 'success' : 'primary'}
                                                    ></Chip>
                                                </td>
                                                <td>{moment(el.date).format("DD-MM-YYYY")}</td>
                                                <td>{el.date_edit !== null ? moment(el.date_edit).format("DD-MM-YYYY") : "-"}</td>
                                                <td className="d-flex justify-content-evenly">
                                                    <NavLink to={`/detaill/${el.id}`}><button className="btn btn-success"><RemoveRedEyeIcon /></button></NavLink>
                                                </td>

                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            </div>

        </>
    )
}

export default Homee