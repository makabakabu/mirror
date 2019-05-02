import React, { useState, useContext, useCallback } from 'react';
import Tag from "./tag";
import { Context } from "../index";
import { throttle }  from "lodash";

export default function Index() {
    const [press, setPress] = useState(false);
    const { setTagSideBarWidth: contextSetTagSideBarWidth } = useContext(Context);
    const setTagSideBarWidth = useCallback(throttle((width: number) => {
        contextSetTagSideBarWidth(width)
    }, 100), []);
    return (
        <div
            onMouseMove={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                if (press) {
                    setTagSideBarWidth(event.clientX);
                    console.log(event.clientX);
                }
            }}       
            onMouseUp={() => {
                setPress(false);
            }}
            style={{ display: "flex" }}
        >
            <Tag />
            <div
                style={{ width: 5, height: "100%", backgroundColor: "black", cursor: "ew-resize" }}
                onMouseDown={() => {
                    setPress(true);
                }}
            />
        </div>
    );
};