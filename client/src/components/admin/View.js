import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const View = () => {
    return (
        <>
            <div className="container mt-3">
                <div className='d-flex justify-content-between align-iteams-center mt-5'>
                    <Card style={{ width: '22rem', height: '18rem' }} className='mb-3'>
                        <Card.Img variant="top" src="/pdficon2.png" style={{ width: '100px', textAlign: 'center', margin: 'auto' }} className='mb-2' />
                        <Card.Body className='text-center'>
                            <Card.Title>UserName : </Card.Title>
                            <Card.Text>
                                Date Added :
                            </Card.Text>
                            <Button variant="danger" className='col-lg-6 text-center'>Delete</Button>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    )

}

export default View