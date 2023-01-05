import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import Nav from 'react-bootstrap/Nav';


const Status = () => {
    return (
        <>
            <div className="container mt-3">
                <h1>Status Your File Here</h1>
                <div>
                    <form className="d-flex mt-3">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
                <div className='d-flex align-iteams-center mt-3'>
                    <Table bordered hover>
                        <thead>
                            <tr className="table-dark">
                                <th>Topic</th>
                                <th>name</th>
                                <th>status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>การยื่นเรื่องคำร้อง 1</td>
                                <td>
                                    <Nav.Link href="/view" className='text-primary'>621011XXX</Nav.Link>
                                </td>
                                <td>
                                    <Alert variant="info">
                                        รอดำเนินการอยู่
                                    </Alert>
                                </td>
                            </tr>
                            <tr>
                                <td>การยื่นเรื่องคำร้อง 1</td>
                                <td>
                                    <Nav.Link href="/view" className='text-primary'>621011XXX</Nav.Link>
                                </td>
                                <td>
                                    <Alert variant="success">
                                        เอกสารเรียบร้อย
                                    </Alert>
                                </td>

                            </tr>
                            <tr>
                                <td>การยื่นเรื่องคำร้อง 1</td>
                                <td>
                                    <Nav.Link href="/view" className='text-primary'>621011XXX</Nav.Link>
                                </td>
                                <td>
                                    <Alert variant="warning">
                                        เอกสารถูกยกเลิก
                                    </Alert>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>

        </>
    )

}

export default Status