import React, { useState, useReducer } from 'react';
import Header from "./header";
import Body from "./body";
import { set } from "little_bit";
import { type } from '../data/constant';
import { flatten } from "lodash";

const initialState: type.State = {
    区域: {},
    埋点: {},
    AB测试号: {},
    数据: {},
    逻辑: {},
    UI和UX: {},
    跳转链接: {},
}

type Action = { type: 'setDisplayArea'; displayArea: string[] };

const reducer = (state: type.State, action: Action) => {
    switch (action.type) {
        case "setDisplayArea":
            return set(["displayArea"], action.displayArea, state) as type.State;

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
    // 根据state获取到 tagList
    const [searchTagList, setSearchTagList] = useState([] as string[]);
    const [searchFunctionTypeList, setSearchFunctionTypeList] = useState([] as type.functionType[]);
    const functionTypeList: type.functionType[] = ["埋点", "AB测试号", "数据", "逻辑", "UI和UX", "跳转链接"];
    const [textContainedList, setTextContainedList] = useState([] as string[]);
    const tagList = flatten(functionTypeList.map((certainFunctionType) => flatten(Object.values(state[certainFunctionType]).map((certainFunctionTypeItem) => certainFunctionTypeItem.tagList))));
    //  获取可以展示到页面的数据
    const [path, setPath] = useState([] as string[]);
    return (
        <div style={{ display: "flex", flexDirection: "column", width: "100%", height: window.innerHeight }}>
            <Header tagList={tagList} textContainedList={textContainedList} setTextContainedList={setTextContainedList} searchTagList={searchTagList} setSearchTagList={setSearchTagList} functionTypeList={functionTypeList} searchFunctionTypeList={searchFunctionTypeList} setSearchFunctionTypeList={setSearchFunctionTypeList} /> {/*使用 fixed 进行定位 */}
            <Body />
        </div>
    );
}
