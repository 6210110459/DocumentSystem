import Card from 'react-bootstrap/Card';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import EditIcon from '@mui/icons-material/Edit';
import Button from 'react-bootstrap/Button';
import { NavLink, useParams } from "react-router-dom"

const Detail = () => {

    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    const [data, setData] = useState([]);
    console.log(data);

    const {id} = useParams("");
    // console.log(id);

    const getUserData2 = async (id) => {
        const res = await axios.get(`/induser/${id}`,{
            headers: {
                "Content-Type": "application/json"
            }
        });
        // /induser/${id}

        if (res.data.status === 201) {
            setData(res.data.data)
            console.log("data show");
        } else {
            console.log("error")
        }
    }

    // const getSignuser = async (id) => {
    //     const res1 = await axios.get(`/induser/${id}`, {
    //         headers: {
    //             "Content-Type": "multipart/form-data"
    //         }
    //     })

    //     if (res1.data.status === 201) {
    //         getUserData2()
    //         setData(res1.data.data)
    //         console.log("data show");
    //     } else {
    //         console.log("error")
    //     }
    // }

    useEffect(() => {
        getUserData2(id)
    }, [id])

    return (
        <>
            <div className='container mt-3'>

                {/* <Card style={{ width: '100%' }} className='mt-2'>
                    <Card.Header as="h5">{data.username}</Card.Header>
                    <Card.Body>
                        <Card.Title>6210110XXX</Card.Title>
                        <Card.Text>
                            การยื่นเรื่องคำร้อง
                        </Card.Text>
                    </Card.Body>
                </Card> */}

                {
                    data.map((el) => {
                        return (
                            <>
                                <div className='text-end'>
                                    <Button variant="primary"><NavLink to={`/edit/${el.id}`} className="text-decoration-none text-light"><EditIcon /> update </NavLink></Button>
                                </div>

                                <Card style={{ width: '100%' }} className='mt-2' >
                                    <Card.Header as="h5">{el.username}</Card.Header>
                                    <Card.Body>
                                        <Card.Title>{el.topic}</Card.Title>
                                        <Card.Text>
                                            {el.decs}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>

                                <div style={{ height: '100%' }} className='mt-3' >
                                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.1.81/build/pdf.worker.min.js" >
                                        <Viewer fileUrl={`/uploads/${el.userfile}`} plugins={[defaultLayoutPluginInstance]}/>
                                    </Worker>
                                </div>
                            </>
                        )
                    })
                }
                {/* {
                    signdata((data) => {
                        return (
                            <>
                                <div className='text-end'>
                                    <Button variant="primary"><NavLink to={`/edit/${data.id}`} className="text-decoration-none text-light"><EditIcon /> update </NavLink></Button>
                                </div>

                                <Card style={{ width: '100%' }} className='mt-2'>
                                    <Card.Header as="h5">{data.username}</Card.Header>
                                    <Card.Body>
                                        <Card.Title><span>{data.topic}</span></Card.Title>
                                        <Card.Text>
                                            <span>{data.decs}</span>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>

                                <div style={{ height: '100%' }} className='mt-3' >
                                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.1.81/build/pdf.worker.min.js">
                                        <Viewer fileUrl={`/uploads/${data.id}`} plugins={[defaultLayoutPluginInstance]} />
                                    </Worker>
                                </div>
                            </>

                        )

                    })
                } */}



            </div>
        </>
    )
}

export default Detail