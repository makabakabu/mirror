import React, { useEffect, useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Rnd } from 'react-rnd';
// import

export default function Index() {
    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
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
    return (
        <div style={{ display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
            <section className="container">
                <div {...getRootProps({ className: 'dropzone' })} style={{ outline: "none", cursor: "default" }}>
                    {files.length === 0 ? <input {...getInputProps()} /> : <input {...getInputProps()} onClick={() => { }} />}
                    {files.length === 0
                        ? <p style={{ userSelect: "none", width: window.innerWidth, height: window.innerHeight - 80, display: "flex", alignItems: "center", justifyContent: "center" }}>{isDragActive ? "松下鼠标导入图片" : "拖拽或者从文件夹导入背景"}</p>
                        : <aside style={{ display: 'flex', width: window.innerWidth, height: window.innerHeight - 80, justifyContent: "center", alignItems: "flex-start", overflow: "scroll" }}>
                            <img
                                alt="backgroundImage"
                                src={(files[0] as any).preview}
                            />
                        </aside>
                    }
                </div>
            </section>
        </div>
    );
}

const thumb: React.CSSProperties = {
    borderRadius: 2,
    border: '1px solid #eaeaea',
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};
