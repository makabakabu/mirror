import React, { useEffect, useState } from 'react';
import Search from "./search";
import { TagNameList } from '../__component__';
import { type } from '../../data/constant';
import { compose, reduce } from "little_bit";
import { intersection, uniq, difference } from "lodash";

// tagList 是结合前面的tagList 给出的结果, 不是所有的tagList
// setSearchTagList = 

interface PropType {
    state: type.State;
    searchTagList: string[];
    setSearchTagList: (tagList: string[]) => void;
    functionTypeList: type.functionType[];
    setFunctionTypeList: (functionTypeList: type.functionType[]) => void;
}

export default function Header({state, searchTagList, setSearchTagList, functionTypeList, setFunctionTypeList }: PropType) {
    // get the the whole state
    // set the status
    // set the functionType
    // !有几个因素会改变外部的state变化和 functionType 改变回更改 reshapedState
    // first reshape the the status
    const [restTagList, setRestTagList] = useState(searchTagList as string[]);
    useEffect(() => {
        const tempRestTagList: string[] = compose(
            () => reduce(state, (result, value, key) => ({ ...result, ...(functionTypeList.includes(key) ? value : {}) }), {}),
            (data) => reduce(data, (result, value) => intersection(value.tagList, searchTagList).length === searchTagList.length ? uniq([...result, ...difference(value.tagList, searchTagList)]) : result, []),
        )();
        setRestTagList(tempRestTagList);
    }, [functionTypeList, state, searchTagList]);
    // 选择了
    return (
        <div style={{ display: "flex", position: "relative", justifyContent: "space-between", alignItems: "center", width: "95%", height: "50px", backgroundColor: "white", paddingLeft: "2.5%", paddingRight: "2.5%", boxShadow: "0px 1px 1px #ccc" }}>
            <Search restTagList={restTagList} setSearchTagList={(tag: string) => { setSearchTagList([...searchTagList, tag]); }} />
        </div>
    );
} 
