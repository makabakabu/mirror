import React, { useEffect, useState, useCallback } from 'react';
import { range } from "little_bit";

export default function Index() {
    const resize = useCallback(() => {
        setWidth(window.innerWidth * 0.8);
        setHeight(window.innerHeight);
    }, []);
    useEffect(() => {
        window.addEventListener("resize", resize);
        return () => {
            window.removeEventListener("resize", resize);
        }
    }, [resize]);
    const [width, setWidth] = useState(window.innerWidth * 0.8);
    const [height, setHeight] = useState(window.innerHeight);
    return (
        <div style={{ display: "flex", flex: 1,  position: "relative" }}>
            <div style={{ position: "absolute", top: 0, left: 0, display: "flex", width, height, flexWrap: "wrap", overflow: "auto", borderTop: "1px solid #eee", borderRight: "1px solid #eee" }}>
                {
                    range(80 * Math.ceil(5 * height / (width / 80))).map((index: number) => <div key={index} style={{ width: width / 80 - 1 + "px", height: width / 80 - 1 + "px", borderBottom: "1px solid #eee", borderLeft: "1px solid #eee" }} />)
                }
            </div>
        </div>
    );
} 