import Card from 'react-bootstrap/Card';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import EditIcon from '@mui/icons-material/Edit';
import { useParams } from "react-router-dom";
// import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';

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
        const token = localStorage.getItem('token')

        fetch("http://localhost:8004/authuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'ok') {
                    // alert('authen success')
                    // console.log(data.decode)
                    getUserData2(id)
                } else {
                    alert('authen failed')
                    localStorage.removeItem('token')
                    window.location = "/"
                }
            })
            .catch((error) => {
                console.error("Error:", error)
            });
        
    }, [id])

    return (
        <>
            <div className='container mt-3'>
                {
                    data.map((el) => {
                        return (
                            <>
                                {
                                    el.status_id === 1 ?
                                        <div className='text-end justify-content-end'>
                                            <a href={`/update/${el.id}`} ><button class="btn btn-primary" ><EditIcon /> update </button></a>
                                            <a href={`/fail/${el.id}`}><button class="btn btn-danger" ><EditIcon /> mistake </button></a>
                                        </div> :
                                        el.status_id === 2 ?
                                            <div className='text-end justify-content-end'>
                                                <a href={`/update/${el.id}`} ><button class="btn btn-primary" ><EditIcon /> update </button></a>
                                            </div> : ""
                                }


                                {/* <div className='text-end justify-content-end'>
                                    <NavLink to={`/update/${el.id}`} className="text-decoration-none text-light"><button class="btn btn-primary" ><EditIcon /> update </button></NavLink>
                                    <button class="btn btn-danger"><NavLink to={`/fail/${el.id}`} className="text-decoration-none text-light"><EditIcon /> mistake </NavLink></button>
                                    <a href={`/update/${el.id}`} ><button class="btn btn-primary" ><EditIcon /> update </button></a>
                                    <a href={`/fail/${el.id}`}><button class="btn btn-danger" ><EditIcon /> update </button></a>
                                </div> */}



                                <Card style={{ width: '100%' }} className='mt-2' >
                                    <Card.Header as="h4" className='bg-dark text-white'>{el.ffname} {el.llname}</Card.Header>
                                    <Card.Body>
                                        <Card.Title>หัวข้อเอกสาร: {el.topic}</Card.Title>
                                        <Card.Text>รายละเอียด: {el.decs}</Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Card.Subtitle>หมายเหตุ: {el.decs_fail}</Card.Subtitle>
                                    </Card.Footer>
                                </Card>

                                    <div>

                                    </div>

                                    <div style={{ height: '100%' }} className='mt-3' >
                                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.1.81/build/pdf.worker.min.js" >
                                            <Viewer fileUrl={`/uploads/${el.userfile}`} plugins={[defaultLayoutPluginInstance]}/>
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