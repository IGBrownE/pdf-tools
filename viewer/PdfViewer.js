// pages/index.js
'use client'
import React, { useEffect, useRef } from 'react';
import { base64 } from './base64';

export default function App() {
    const canvasRef = useRef(null);

    async function base64ToArrayBuffer(data) {
        const raw = atob(data)
        const unit8Array = new Uint8Array(raw.length)
        for (let i = 0; i < raw.length; i++) {
            unit8Array[i] = raw.charCodeAt(i);
        }
        return unit8Array
    };
    useEffect(() => {
        const test = async () => {
            console.log(1)
            const pdfJS = await import('pdfjs-dist/build/pdf');
            pdfJS.GlobalWorkerOptions.workerSrc = window.location.origin  + '/pdf.worker.min.mjs'
            // + new URL(
            //     'pdfjs-dist/build/pdf.worker.min.mjs',
            //     import.meta.url,
            // ).toString();

       debugger
            const unitArray = await base64ToArrayBuffer(base64)
            const pdf = await pdfJS.getDocument({ data: unitArray }).promise;
            const page = await pdf.getPage(1);
            const viewport = page.getViewport({ scale: 1.5 });

            // Prepare canvas using PDF page dimensions.
            const canvas = canvasRef.current;
            const canvasContext = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // Render PDF page into canvas context.
            const renderContext = { canvasContext, viewport };
        console.log(1)
            page.render(renderContext);
        }

        test()
    }, []);

    return <div style={{width:'100%', height:'100%', position:'absolute',top:0,left:0, overflow:'scroll', display:'flex'}}>
        <canvas ref={canvasRef} style={{ height: '100%',  }} />;
    </div>
}