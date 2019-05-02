import React, { useEffect, createContext, useState, useCallback } from 'react';
import TagSideBar from "./tagSideBar";
import FilterSideBar from "./filterSideBar";
import BodyFilter from "./bodyFilter";
import Body from "./body";

const Context = createContext({
    height: window.innerHeight,
});
export default function APP() {
    const [height, setHeight] = useState(window.innerHeight);
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        window.addEventListener("resize", resize);
    });
    const resize = useCallback(() => {
        setHeight(window.innerHeight);
        setWidth(window.innerWidth);
    }, []);
    return (
        <Context.Provider value={{ height, width }}>
            <div style={{ position: "relative" }}>
                <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height, backgroundColor: "red", display: "flex" }}>
                    <TagSideBar />
                    <FilterSideBar />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <BodyFilter />
                        <Body />
                    </div>
                </div>
            </div>
        </Context.Provider>
    );
}
