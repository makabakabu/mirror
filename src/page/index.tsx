import React, { useState, useReducer } from 'react';
import Header from "./header";
import Body from "./body";
import { set } from "little_bit";
import { type } from '../data/constant';

const initialState: type.State = {
    filter: {
        area: [],
        functionType: [],
        tag: [],
        containText: [],
    },
    area: {},
    buriedPoint: {},
    ABTestCode: {},
    data: {},
    businessLogic: {},
    UIAndUX: {},
    jumpLink: {},
    testCase: {},
}

type Action = { type: 'setDisplayArea'; displayArea: string[] };

const reducer = (state: type.State, action: Action) => {
    switch (action.type) {
        case "setDisplayArea":
            return set(["displayArea"], action.displayArea, state);

        default:
            return state;
    }

}

export default function APP() {
    {/*
        1.卡片的增删改 移动（比较复杂）
        2. 
    */}
    const [state, dispatch] = useReducer(reducer, initialState);
    const [searchTagList, setSearchTagList] = useState([] as string[]);
    const [functionTypeList, setFunctionTypeList] = useState([] as type.functionType[]);
    return (
        <div style={{ display: "flex", flexDirection: "column", width: "100%", height: window.innerHeight }}>
            <Header state={state} searchTagList={searchTagList} setSearchTagList={setSearchTagList} functionTypeList={functionTypeList} setFunctionTypeList={setFunctionTypeList} /> {/* 使用 fixed 进行定位 */}
            <Body />
        </div>
    );
}
