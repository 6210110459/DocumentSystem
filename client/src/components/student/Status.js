import React, { useEffect, useState } from 'react'
import axios from 'axios';
// import moment from "moment";
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import { NavLink } from "react-router-dom"
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';


const Status = () => {

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
            <div className="container mt-3">
                <h1>Status Your File Here</h1>
                {/* <div>
                    <form className="d-flex mt-3">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
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
                                                    <Alert variant="dark">{el.status_file}</Alert>
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