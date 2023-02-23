import Card from 'react-bootstrap/Card';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import EditIcon from '@mui/icons-material/Edit';
import Button from 'react-bootstrap/Button';
import { NavLink, useParams } from "react-router-dom";

const Detail = () => {

    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    const [data, setData] = useState([]);
    console.log(data);

    const { id } = useParams("");
    // console.log(id);

    const getUserData2 = async (id) => {
        const res = await axios.get(`/induser/${id}`, {
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

    useEffect(() => {
        getUserData2(id)
    }, [id])

    return (
        <>
            {/* {
                statusf ? <Alert variant="primary" onClose={() => setStatus()} dismissible>
                    Download File
                </Alert> : ""
            } */}
            <div className='container mt-3'>
                {
                    data.map((el) => {
                        return (
                            <>
                                <div className='text-end'>
                                    <Button variant="primary"><NavLink to={`/update/${el.id}`} className="text-decoration-none text-light"><EditIcon /> update </NavLink></Button>
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
                                        <Viewer fileUrl={`/uploads/${el.userfile}`} plugins={[defaultLayoutPluginInstance]} />
                                    </Worker>
                                </div>
                            </>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Detail