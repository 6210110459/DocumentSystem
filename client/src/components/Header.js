import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import axios from 'axios';

const Header = () => {

    const handlelogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token')
        window.location = "/"
    }

    // const email
    const [user, setUser] = useState([]);

    const getUserR = () => {
        const token = localStorage.getItem('token')

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:8004/getrole", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === 201) {
                    setUser(result.data)
                    console.log(result)
                }

            })

            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        getUserR()
    }, [])

    return (
        <>
            {/* <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/home">Document System</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Nav className="me-auto" navbarScroll>
                        <Nav.Link href="/upload">Upload</Nav.Link>
                        <Nav.Link href="/status">Status</Nav.Link>
                        <Nav.Link href="/admin/home">admin</Nav.Link>
                        <Nav.Link href="/teacher/home">teacher</Nav.Link>
                    </Nav>
                    <Navbar.Collapse id="navbarScroll" className="justify-content-end">
                        <Form>
                            <Button variant="dark" href='/'>Mark</Button>
                            <Button variant="danger" onClick={handlelogout}>Logout</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar> */}

            {/* <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Document System</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/register">Register</Nav.Link>
                        <Nav.Link href="/status">Status</Nav.Link>
                        <Nav.Link href="/admin/home">admin</Nav.Link>
                        <Nav.Link href="/teacher/home">teacher</Nav.Link>
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar> */}



            {
                user.map((el) => {
                    return (
                        <>
                            {el.roleuser === 'student' ?
                                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                                    <Container>
                                        <Navbar.Brand href="/home">Document System</Navbar.Brand>
                                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                        <Navbar.Collapse id="responsive-navbar-nav">
                                            <Nav className="me-auto">
                                                <Nav.Link href="/upload">Upload</Nav.Link>
                                                {/* <Nav.Link href="/status">Status</Nav.Link> */}
                                            </Nav>
                                            <Nav>
                                                <Nav.Link href="/home">{el.ffname} {el.llname}</Nav.Link>
                                                <Nav.Link onClick={handlelogout} className='text-danger'>
                                                    LOGOUT
                                                </Nav.Link>
                                            </Nav>
                                        </Navbar.Collapse>
                                    </Container>
                                </Navbar>
                                : el.roleuser === 'teacher' ?
                                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                                        <Container>
                                            <Navbar.Brand href="/teacher/home">Document System</Navbar.Brand>
                                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                            <Navbar.Collapse id="responsive-navbar-nav">
                                                <Nav className="me-auto">
                                                    {/* <Nav.Link href="/upload">Upload</Nav.Link>
                                                    <Nav.Link href="/status">Status</Nav.Link> */}
                                                </Nav>
                                                <Nav>
                                                    <Nav.Link href="/teacher/home">{el.ffname} {el.llname}</Nav.Link>
                                                    <Nav.Link onClick={handlelogout} className='text-danger'>
                                                        LOGOUT
                                                    </Nav.Link>
                                                </Nav>
                                            </Navbar.Collapse>
                                        </Container>
                                    </Navbar>
                                    : <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                                        <Container>
                                            <Navbar.Brand href="/admin/home">Document System</Navbar.Brand>
                                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                            <Navbar.Collapse id="responsive-navbar-nav">
                                                <Nav className="me-auto">
                                                    {/* <Nav.Link href="/upload">Upload</Nav.Link>
                                                    <Nav.Link href="/status">Status</Nav.Link> */}
                                                </Nav>
                                                <Nav>
                                                    <Nav.Link href="/admin/home">{el.ffname} {el.llname}</Nav.Link>
                                                    <Nav.Link onClick={handlelogout} className='text-danger'>
                                                        LOGOUT
                                                    </Nav.Link>
                                                </Nav>
                                            </Navbar.Collapse>
                                        </Container>
                                    </Navbar>
                            }

                        </>
                    )

                })
            }


        </>
    )
}

export default Header