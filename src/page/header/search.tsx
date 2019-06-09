import React, { useRef, useState } from 'react';
import { InputBase } from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";
import Autocomplete from "react-autocomplete";

export default function Input({ restTagList, setSearchTagList }: { restTagList: string[]; setSearchTagList: (tag: string) => void }) {
    // const press
    // let inputValue = useRef("");
    const inputRef = useRef();
    // get the whole tagList and let it be autocomplete
    const tagList = ["apple", "banana", "pear"];
    const [inputValue, setInputValue] = useState("");
    // const [value, setValue] = useState("");
    const filteredTagList = tagList.filter((item) => item.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
    // const [value, setValue] = useState("");
    const [inputFocused, setInputFocused] = useState(false);

    return (
        <div
            style={{ position: "absolute", top: 5, left: "33%", height: inputFocused ? (1 + filteredTagList.length) * 40 : 40, width: 400, border: "1px solid #ccc", display: "flex", flexDirection: "column", alignItems: "flex-start", borderRadius: 20, boxShadow: "#aaa 0px 0px 3px", overflow: "hidden" }} 
        >
            <div style={{ display: "flex" }}>
                <div style={styles.searchIcon}>
                    <SearchIcon style={{ color: "#948492" }}/>
                </div>
                <InputBase
                    onFocus={() => setInputFocused(true)}
                    onBlur={() => setInputFocused(false)}
                    placeholder="Search…"
                    onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                        setInputValue(event.currentTarget.value);
                    }}
                    inputRef={inputRef}
                    onKeyDown={(event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                        if (event.keyCode === 13) {
                            setSearchTagList(inputValue);
                            (inputRef.current as any).value = "";
                            setInputValue("");
                        }
                    }}
                />
            </div>
            {
                filteredTagList.map((tag, index) => <div key={index} onMouseLeave={(event) => { event.currentTarget.style.backgroundColor = "white"; } } onMouseEnter={(event) => { event.currentTarget.style.backgroundColor = "#ccc"; } } style={{ display: "flex", paddingLeft: "20px", alignItems: "center", height: 40, width: "100%", userSelect: "none" }}>
                    {tag}
                </div>)
            }
        </div>
    );
}

const styles = {
    searchIcon: {
        height: "40px",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}

