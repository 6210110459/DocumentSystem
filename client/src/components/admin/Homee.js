import React from 'react';
import Table from 'react-bootstrap/esm/Table';
import EditIcon from '@mui/icons-material/Edit';
import Chip from '@mui/material/Chip';
import Nav from 'react-bootstrap/Nav';

const Homee = () => {

    return (
        <>
            <div className='container mt-2'>
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
                            <tr>
                                <td>1</td>
                                <td>การยื่นเรื่องคำร้อง 1</td>
                                <td>
                                    <Nav.Link href="/view" className='text-primary'>621011XXX</Nav.Link>
                                </td>
                                <td>
                                    <Chip label="เอกสารได้มีการแก้ไข" color="primary"/>
                                </td>
                                <td className="d-flex justify-content-evenly">
                                    <button className="btn btn-primary"><EditIcon/></button>
                                </td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>การยื่นเรื่องคำร้อง 1</td>
                                <td><Nav.Link href="/view" className='text-primary'>621011XXX</Nav.Link></td>
                                <td>
                                    <Chip label="เอกสารได้มีการแก้ไข" color="primary"/>
                                </td>
                                <td className="d-flex justify-content-evenly">
                                    <button className="btn btn-primary"><EditIcon/></button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>

        </>
    )
}

export default Homee