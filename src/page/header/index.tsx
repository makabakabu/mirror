import React, { useEffect, useState } from 'react';
import Search from "./search";
import { tagContainer } from '../__component__';
import { type } from '../../data/constant';
import { compose, reduce } from "little_bit";
import { intersection, uniq, difference } from "lodash";
import TagContainer from '../__component__/tagContainer';

// tagList 是结合前面的tagList 给出的结果, 不是所有的tagList
// setSearchTagList = 

interface PropType {
    tagList: string[];
    searchTagList: string[];
    setSearchTagList: React.Dispatch<React.SetStateAction<string[]>>;
    textContainedList: string[];
    setTextContainedList: React.Dispatch<React.SetStateAction<string[]>>;
    functionTypeList: type.functionType[];
    searchFunctionTypeList: type.functionType[];
    setSearchFunctionTypeList: React.Dispatch<React.SetStateAction<type.functionType[]>>;
}

export default function Header({ tagList, searchTagList, setSearchTagList, textContainedList, setTextContainedList, functionTypeList, searchFunctionTypeList, setSearchFunctionTypeList }: PropType) {
    // get the the whole state
    // set the status
    // set the functionType
    // !有几个因素会改变外部的state变化和 functionType 改变回更改 reshapedState
    // first reshape the the status
    return (
        <div style={{ display: "flex", position: "relative", alignItems: "center", width: "95%", height: "50px", backgroundColor: "white", paddingLeft: "2.5%", paddingRight: "2.5%", boxShadow: "0px 1px 1px #ccc" }}>
            <Search tagList={tagList} searchTagList={searchTagList} setSearchTagList={setSearchTagList} textContainedList={textContainedList} setTextContainedList={setTextContainedList} functionTypeList={functionTypeList} searchFunctionTypeList={searchFunctionTypeList} setSearchFunctionTypeList={setSearchFunctionTypeList} />
            <div style={{ marginLeft: 400, width: window.innerWidth - 500, display: "flex", flexDirection: "row", alignItems: "center" }}>
                {textContainedList.length > 0 && <TagContainer title="文字" tagList={textContainedList} deleteTagList={(tagList: string[]) => { setTextContainedList((searchTagList) => searchTagList.filter((certainTag) => !tagList.includes(certainTag))); }} />}
                {searchTagList.length > 0 && <TagContainer title="标签" tagList={searchTagList} deleteTagList={(tagList: string[]) => { setSearchTagList((searchTagList) => searchTagList.filter((certainTag) => !tagList.includes(certainTag))); }} />}
                {searchFunctionTypeList.length > 0 && <TagContainer title="功能" tagList={searchFunctionTypeList} deleteTagList={(tagList: string[]) => { setSearchFunctionTypeList((searchFunctionTypeList) => searchFunctionTypeList.filter((certainTag) => !tagList.includes(certainTag))); }} />}
            </div>
        </div>
    );
} 
