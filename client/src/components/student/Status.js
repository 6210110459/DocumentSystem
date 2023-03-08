import React, { useEffect, useState } from 'react'
import axios from 'axios';
// import moment from "moment";
import Table from 'react-bootstrap/Table';
import Chip from '@mui/material/Chip';
import { NavLink } from "react-router-dom"
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import Dropdown from 'react-bootstrap/Dropdown';
// import Header from '../Header';

const Status = () => {

    const [data, setData] = useState([]);
    console.log(data);

    const getData = async () => {
        const res = await axios.get("/getdata", {
            headers: {
                "Content-Type": "application/json"
            },
        });

        if (res.data.status === 201) {
            console.log("data get");
            setData(res.data.data)
        } else {
            console.log("error")

        }
    }

    useEffect(() => {
        getData()
    }, [])

//    const [search, setSearch] = useState("");

    return (
        <>
            {/* <Header /> */}
            <div className="container mt-3">
                <h1>Status Your File Here</h1>
                {/* <div>
                    <form className="d-flex mt-3">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div> */}
                {/* <div className="mt-4 d-flex justify-content-between">
                    <div className="filter_status">
                        <Dropdown className='text-center'>
                            <Dropdown.Toggle id="dropdown-basic" variant="warning">สถานะเอกสาร</Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item>รอการดำเนินการ</Dropdown.Item>
                                <Dropdown.Item>เอกสารสำเร็จ</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                    <div className="search col-lg-4">
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                // onChange={(e)=>setSearch(e.target.value)}
                            />
                            <Button variant="primary" className='search_btn'>Search</Button>
                        </Form>
                    </div>
                </div> */}

                <div className='d-flex align-iteams-center mt-3'>
                    <Table bordered hover>
                        <thead>
                            <tr className="table-dark">
                                <th>#</th>
                                <th>Topic</th>
                                <th>name</th>
                                <th>status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((el, i) => {
                                    return (
                                        <>
                                            <tr>
                                                <th scope="row">{i + 1}</th>
                                                <td>{el.topic}</td>
                                                <td>
                                                    {el.username}
                                                </td>
                                                <td>
                                                    <Chip label={el.status_file} color={el.status_file === 'รอการดำเนิน' ? 'warning' : 'success'}></Chip>
                                                </td>
                                                <td className="d-flex justify-content-evenly">
                                                    <NavLink to={`/detail/${el.id}`}><button className="btn btn-success"><RemoveRedEyeIcon /></button></NavLink>
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

export default Status