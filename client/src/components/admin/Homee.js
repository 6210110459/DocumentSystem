import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/esm/Table';
import EditIcon from '@mui/icons-material/Edit';
import Chip from '@mui/material/Chip';
import Nav from 'react-bootstrap/Nav';


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
        getData()
    }, [])

    return (
        <>
            <div className='container mt-2'>
                <div>
                    <form className="d-flex mt-3">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
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
                            {/* <tr>
                                <td>1</td>
                                <td>การยื่นเรื่องคำร้อง 1</td>
                                <td>
                                    <Nav.Link href="/view" className='text-primary'>621011XXX</Nav.Link>
                                </td>
                                <td>
                                    <Chip label="เอกสารได้มีการแก้ไข" color="primary" />
                                </td>
                                <td className="d-flex justify-content-evenly">
                                    <button className="btn btn-primary"><EditIcon /></button>
                                </td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>การยื่นเรื่องคำร้อง 1</td>
                                <td><Nav.Link href="/view" className='text-primary'>621011XXX</Nav.Link></td>
                                <td>
                                    <Chip label="เอกสารได้มีการแก้ไข" color="primary" />
                                </td>
                                <td className="d-flex justify-content-evenly">
                                    <button className="btn btn-primary"><EditIcon /></button>
                                </td>
                            </tr> */}
                            {
                                data.map((el, i) => {
                                    return (
                                        <>
                                            <tr>
                                                <th scope="row">{i + 1}</th>
                                                <td>Topic1</td>
                                                <td>
                                                    <Nav.Link href="/view" className='text-primary'>
                                                        {el.username}
                                                    </Nav.Link>
                                                </td>
                                                <td>
                                                    <Chip label="เอกสารได้มีการแก้ไข" color="primary" />
                                                </td>
                                                <td className="d-flex justify-content-evenly">
                                                    <button className="btn btn-primary"><EditIcon /></button>
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