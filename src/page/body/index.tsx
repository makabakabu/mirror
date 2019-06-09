import React, { useEffect, useState, useCallback } from 'react';
import { range } from "little_bit";
import { useDropzone } from 'react-dropzone';
// import

export default function Index() {
    const [files, setFiles] = useState([]);
    const {getRootProps, getInputProps} = useDropzone({
        accept: 'image/*',
        onDrop: (acceptedFiles: File[]) => {
            setFiles((acceptedFiles as any).map((file: any) => Object.assign(file, {
                preview: URL.createObjectURL(file),
            })));
        }
    });
    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    }, [files]);
    
    const resize = useCallback(() => {
        setHeight(window.innerHeight);
    }, []);
    useEffect(() => {
        window.addEventListener("resize", resize);
        return () => {
            window.removeEventListener("resize", resize);
        }
    }, [resize]);
    const [height, setHeight] = useState(window.innerHeight);
    const thumbs = files.map((file: any) => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    alt="backgroundImage"
                    src={file.preview}
                    style={img}
                />
            </div>
        </div>
    ));
    return (
        <div style={{ display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
            {/* <div style={{ zIndex: -1, position: "absolute", top: 0, left: 0, display: "flex", width: 2000, height, flexWrap: "wrap", overflow: "auto", borderTop: "1px solid #eee", borderRight: "1px solid #eee" }}>
                {
                    range(80 * Math.ceil(5 * height / 10)).map((index: number) => <div key={index} style={{ width: "10px", height: "10px", borderBottom: "1px solid #eee", borderLeft: "1px solid #eee" }} />)
                }
            </div> */}
            <section className="container">
                <div {...getRootProps({className: 'dropzone'})}>
                    <input style={{ outline: "none" }} {...getInputProps()}  />
                    <p style={{ userSelect: "none" }}>拖拽或者从文件夹导入背景</p>
                </div>
                <aside style={{ display: 'flex', flexWrap: 'wrap', marginTop: 16 }}>
                    {thumbs}
                </aside>
            </section>
        </div>
    );
}
  
const thumb: React.CSSProperties = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
};
  
const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};
  
const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};