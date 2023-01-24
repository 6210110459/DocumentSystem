// import DocViewer from "react-doc-viewer";
// import React, { useState } from 'react';
// import { Viewer, Worker } from '@react-pdf-viewer/core';
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import { Card } from "@mui/material"

const View = () => {
    // const docs = [
    //     { uri: "./server/uploads/file-1673859258336.6210110459_project-report.pdf" },
    //     // { uri: require("./uploads/file-1673859258336.6210110459_project-report.pdf") }, // Local File
    // ];

    // const [pdfFile, setPDFFile] = useState(null)
    // const [viewPdf, setViewPdf] = useState(null)

    // const fileType = ['application/pdf']
    // const handleChange = (e) => {
    //     let selectedFile = e.target.files[0]
    //     if(selectedFile) {
    //         if(selectedFile && fileType.includes(selectedFile.type)) {
    //             let reader = new FileReader()
    //             reader.readAsDataURL(selectedFile)
    //             reader.onload = (e) => {
    //                 setPDFFile(e.target.result)
    //             }
    //         } else {
    //             setPDFFile(null)
    //         }
    //     } else {
    //         console.log("please select")
    //     }
    // }

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     if(pdfFile !== null) {
    //         setViewPdf(pdfFile)
    //     } else {
    //         setViewPdf(null)
    //     }
    // }

    // const newplugin = defaultLayoutPlugin()

    return (
        <>
            <div className="container mt-3">
                {/* <DocViewer documents={docs} /> */}

                {/* <div style={{width: '100%', height: '900px'}} className='overflow-y-auto d-flex justify-content-center align-item-center'>
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.1.81/build/pdf.worker.min.js">
                        { viewPdf && <>
                            <Viewer fileUrl={viewPdf} plugins={[newplugin]}/>
                        </>}
                        {!viewPdf && <>No PDF</>}
                    </Worker>
                </div> */}

                <div>
                    <Card>
                        <Card.Header>6210110XXX</Card.Header>
                        <Card.Body>
                            <Card.Title>Special title treatment</Card.Title>
                            <Card.Text>
                                With supporting text below as a natural lead-in to additional content.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    )

}

export default View