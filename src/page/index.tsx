import React, { useEffect, createContext, useState, useCallback, useReducer } from 'react';
import TagSideBar from "./tagSideBar";
import FilterSideBar from "./filterSideBar";
import BodyFilter from "./bodyFilter";
import Body from "./body";
import { set } from "little_bit";

type keyCodeNameType = "shift" | "control" | "command" | "space" | "enter";

const keyMap: { [key: number]: keyCodeNameType } = {
    16: "shift",
    17: "control",
    91: "command",
    32: "space",
    13: "enter"
};

const contextObject: {
    keyCode?: keyCodeNameType;
} = {
    keyCode: undefined,
};
interface State {
    keyCode?: keyCodeNameType,
    mouseDownArea?: "tagSideBar" | "filterSideBar" | "bodyFilter",
};

type Action = { type: 'setKeyCode'; keyCode: number }
    | { type: 'setMouseDownArea', mouseDownArea?: "tagSideBar" | "filterSideBar" | "bodyFilter" };
const reducer = (state: State, action: Action) => {
    // mouseDownArea
    switch (action.type) {
        case "setKeyCode":
            return set(["keyCode"], action.keyCode, state);

        case "setMouseDownArea":
            return set(["mouseDownArea"], action.mouseDownArea, state);

        default:
            return state;
    }
}
export const Context = createContext(contextObject);
export default function APP() {
    const [state, dispatch] = useReducer(reducer, {});
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
    const mousemove = useCallback(() => {
        // it depends on the mouseDown action when it taken place
        // record the place when it touches on the div, get the (x, y)
        // when it mouseUp clear the mouseDown
        // directly multiple the dom and record it in the width
    }, []);
    const mouseup = useCallback(() => {

    }, []);
    useEffect(() => {
        window.addEventListener("resize", resize);
        window.addEventListener("keydown", keydown as any);
        window.addEventListener("keyup", keyup);
        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);
        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("keydown", keydown as any);
            window.removeEventListener("keyup", keyup);
            window.removeEventListener("mousemove", mousemove);
            window.removeEventListener("mouseup", mouseup);
        }
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
