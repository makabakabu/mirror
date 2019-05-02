import React, { useState, useRef } from 'react';
import Card from "./card";
import { InputBase } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { TagList } from "../__component__/";

export default function Index() {
    const [tagNameList, setTagNameList] = useState([] as string[]);
    // const press
    let inputValue = useRef("");
    const inputRef = useRef();
    return (
        <div style={{ height: window.innerHeight, width: 200, color: "white", backgroundColor: "green" }}>
            <div
                style={{
                    border: "1px solid black", display: "flex", alignItems: "center"
                }}
            >
                <div style={styles.searchIcon}>
                    <Search />
                </div>
                <InputBase
                    placeholder="Search…"
                    onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                        inputValue.current = event.currentTarget.value;
                    }}
                    inputRef={inputRef}
                    onKeyDown={(event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                        if (event.keyCode === 13) {
                            setTagNameList([...tagNameList, inputValue.current]);
                            (inputRef.current as any).value = "";
                            // setTagNameList();
                        }
                    }}
                />
            </div>
            <TagList tagNameList={tagNameList} />
            <Card />
        </div>
    );
};

const styles = {
    searchIcon: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}