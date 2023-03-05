import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/esm/Table';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Chip from '@mui/material/Chip';
// import Button from 'react-bootstrap/Button';
import { NavLink } from "react-router-dom";
// import Form from 'react-bootstrap/Form';


const HomeT = () => {
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
        getData()
    }, [])

    return (
        <>
            <div className='container mt-2'>
            <h1 className='text-center mt-5'>Document Upload Projects With Mysql database</h1>

                <div className='d-flex align-iteams-center mt-5'>
                    <Table hover>
                        <thead>
                            <tr className="table-dark">
                                <th>#</th>
                                <th>Topic</th>
                                <th>name</th>
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

export default HomeT