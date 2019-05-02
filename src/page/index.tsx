import React, { useEffect, createContext, useState, useCallback } from 'react';
import TagSideBar from "./tagSideBar";
import FilterSideBar from "./filterSideBar";
import BodyFilter from "./bodyFilter";
import Body from "./body";

type keyCodeNameType = "shift" | "control" | "command" | "space" | "enter";

const keyMap: { [key: number]: keyCodeNameType }  = {
    16: "shift",
    17: "control",
    91: "command",
    32: "space",
    13: "enter"
};

const contextObject: {
    height: number;
    width: number;
    tagSideBarWidth: number;
    filterSideBarWidth: number;
    keyCode?: keyCodeNameType;
    setTagSideBarWidth: (width: number) => void;
    setFilterSideBarWidth: (width: number) => void;
} = {
    height: window.innerHeight,
    width: window.innerWidth,
    tagSideBarWidth: 200,
    filterSideBarWidth: 200,
    keyCode: undefined,
    setTagSideBarWidth: () => { },
    setFilterSideBarWidth: () => {},
};

export const Context = createContext(contextObject);
export default function APP() {
    const [height, setHeight] = useState(window.innerHeight);
    const [width, setWidth] = useState(window.innerWidth);
    const [keyCode, setKeyCode] = useState(undefined as keyCodeNameType | undefined);
    const [tagSideBarWidth, setTagSideBarWidth] = useState(200);
    const [filterSideBarWidth, setFilterSideBarWidth] = useState(200);
    const keydown = useCallback((event: React.KeyboardEvent<HTMLElement>) => {
        if (keyMap.hasOwnProperty(event.keyCode)) {
            setKeyCode(keyMap[event.keyCode]);
        }
    }, []);
    const keyup = useCallback(() => {
        if (keyCode !== undefined) {
            setKeyCode(undefined);
        }
    }, [keyCode]);
    const resize = useCallback(() => {
        setHeight(window.innerHeight);
        setWidth(window.innerWidth);
    }, []);
    useEffect(() => {
        window.addEventListener("resize", resize);
        window.addEventListener("keydown", keydown as any);
        window.addEventListener("keyup", keyup);
    }, [keydown, keyup, resize]);
    return (
        <Context.Provider value={{ height, width, keyCode, tagSideBarWidth, filterSideBarWidth, setTagSideBarWidth, setFilterSideBarWidth }}>
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
