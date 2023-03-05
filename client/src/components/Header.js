import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';

const Header = () => {

    const handlelogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token')
        window.location = "/login"
    }


    return (
        <>
            {/* <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Document System</Navbar.Brand>
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

            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Document System</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                        <Nav.Link href="/upload">Upload</Nav.Link>
                        <Nav.Link href="/status">Status</Nav.Link>
                        <Nav.Link href="/admin/home">admin</Nav.Link>
                        <Nav.Link href="/teacher/home">teacher</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="/">More deets</Nav.Link>
                            <Nav.Link onClick={handlelogout} className='text-danger'>
                                LOGOUT
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header