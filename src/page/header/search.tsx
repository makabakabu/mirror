import React, { useRef, useState, useCallback } from 'react';
import { InputBase, ListItemText, MenuItem, Popover, Checkbox } from "@material-ui/core";
import { Title, CropFree, SettingsEthernet, LocalOffer } from "@material-ui/icons";
import { type } from '../../data/constant';
import { update, map } from "little_bit";
import { xor, uniq } from "lodash";

interface IPropType {
    tagList: string[];
    searchTagList: string[];
    setSearchTagList: React.Dispatch<React.SetStateAction<string[]>>;
    textContainedList: string[];
    setTextContainedList: React.Dispatch<React.SetStateAction<string[]>>;
    functionTypeList: type.functionType[];
    searchFunctionTypeList: type.functionType[];
    setSearchFunctionTypeList: React.Dispatch<React.SetStateAction<type.functionType[]>>;
}

export default function Input({ tagList, searchTagList, setSearchTagList, textContainedList, setTextContainedList, functionTypeList, searchFunctionTypeList, setSearchFunctionTypeList }: IPropType) {
    const inputRef = useRef();
    const containerRef = useRef();
    type ITagType = "textContained" | "area" | "functionType" | "tag";
    const [tagType, setTagType] = useState("textContained" as "textContained" | "functionType" | "tag");
    const [inputValue, setInputValue] = useState("");
    const typeObject = {
        textContained: {
            type: "input",
            list: textContainedList.map((name) => ({ name, selected: true })),
            set: setTextContainedList,
        },
        tag: {
            type: "select",
            list: tagList.map((name) => ({ name, selected: searchTagList.includes(name) })),
            set: setSearchTagList,
        },
        functionType: {
            type: "select",
            list: functionTypeList.map((name) => ({ name, selected: searchFunctionTypeList.includes(name) })),
            set: setSearchFunctionTypeList,
        },
    }
    const filteredTypeObject: { type: "input" | "select", list: Array<{ name: string, selected: boolean }>, set: (selectedList: string[] | ((selectedList: string[]) => void)) => void } = update("list", (list: Array<{ name: string, selected: boolean }>) => list.filter(({ name }) => name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1), typeObject[tagType]);
    // the searchContent need to know the type: "selector" | "input" selected
    const [inputFocused, setInputFocused] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null as any);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : null as any;
    const focus = useCallback((event) => {
        if (containerRef && !(containerRef.current as any).contains(event.target)) {
            setInputFocused(false);
            document.body.removeEventListener("click", focus);
        }
    }, []);

    const selectMenu = useCallback((tagType) => {
        setAnchorEl(null);
        setTagType(tagType);
    }, []);
    const TagIcon = {
        textContained: Title,
        tag: LocalOffer,
        functionType: SettingsEthernet,
    }[tagType];
    // 先在这边进行架空tagList
    tagList = ["苹果", "西瓜", "橘子"];
    return (
        <div
            style={{ position: "absolute", top: 2.5, left: 10, width: 400, border: "1px solid #ccc", display: "flex", flexDirection: "column", alignItems: "flex-start", borderRadius: 20, boxShadow: "#aaa 0px 0px 3px", overflow: "hidden" }}

            ref={containerRef as any}
        >
            <div style={{ display: "flex", width: "100%", height: 40 }}>
                <div style={styles.searchIcon} onClick={(event) => {
                    setAnchorEl(event.currentTarget);
                }}>
                    <TagIcon style={{ color: "#948492" }} />
                </div>
                <Popover
                    open={open}
                    id={id}
                    anchorEl={anchorEl}
                    onClose={() => { setAnchorEl(null); }}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <MenuItem onClick={() => { selectMenu("textContained"); }}>
                        <Title style={{ color: "#948492" }} />
                        文字
                    </MenuItem>
                    <MenuItem onClick={() => { selectMenu("tag"); }}>
                        <LocalOffer style={{ color: "#948492" }} />
                        标签
                    </MenuItem>
                    <MenuItem onClick={() => { selectMenu("functionType"); }}>
                        <SettingsEthernet style={{ color: "#948492" }} />
                        功能
                    </MenuItem>

                </Popover>
                <InputBase
                    style={{ width: 360 }}
                    placeholder="Search…"
                    onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                        setInputValue(event.currentTarget.value);
                    }}
                    onFocus={() => {
                        if (!inputFocused) {
                            setInputFocused(true);
                            document.body.addEventListener("click", focus);
                        }
                    }}
                    inputRef={inputRef}
                    onKeyDown={(event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                        if (event.keyCode === 13 && inputValue.trim().length > 0 && filteredTypeObject.type === "input") {
                            filteredTypeObject.set((prevList: string[]) => uniq([inputValue, ...prevList]));
                            (inputRef.current as any).value = "";
                            setInputValue("");
                        }
                        // 如果没有不是input类型的数据则直接返回错误toast
                    }}
                />
            </div>
            <div style={{ width: "100%", backgroundColor: "white", maxHeight: 40 * 8, overflow: "scroll" }}>
                {
                    inputFocused && filteredTypeObject.list.map(({ name, selected }, index) => (
                        <MenuItem style={{ width: "100%", height: 40, padding: 0 }} onClick={() => filteredTypeObject.set((prevList) => xor(prevList, [name]))}>
                            <Checkbox checked={selected} style={{ width: 40, height: 40, padding: 0, margin: 0 }} />
                            <ListItemText primary={name} key={index} style={{ display: "flex", alignItems: "center", marginLeft: -16, height: 40, width: "100%", userSelect: "none" }} />
                        </MenuItem>
                    ))
                }
            </div>
        </div>
    );
}

const styles = {
    searchIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}

