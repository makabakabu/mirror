import React, { useRef, useState, useCallback } from 'react';
import { InputBase, ListItemText, MenuItem, Popover, Checkbox } from "@material-ui/core";
import { Title, CropFree, SettingsEthernet, LocalOffer  } from "@material-ui/icons";

export default function Input({ restTagList, setSearchTagList }: { restTagList: string[]; setSearchTagList: (tag: string) => void }) {
    const inputRef = useRef();
    const containerRef = useRef();
    type ITagType = "textContained" | "area" | "functionType" | "tag";
    const [tagType, setTagType] = useState("textContained" as "textContained" | "area" | "functionType" | "tag");
    const [tags, setTags] = useState({
        textContained: [{
            name: "apple",
            selected: false,
        },{
            name: "banana",
            selected: false,
        },{
            name: "pear",
            selected: false,
        }],
        area: [{
            name: "apple",
            selected: false,
        },{
            name: "banana",
            selected: false,
        },{
            name: "pear",
            selected: false,
        }],
        functionType: [{
            name: "apple",
            selected: false,
        },{
            name: "banana",
            selected: false,
        },{
            name: "pear",
            selected: false,
        }],
        tag: [{
            name: "apple",
            selected: false,
        },{
            name: "banana",
            selected: false,
        },{
            name: "pear",
            selected: false,
        }]
    } as {[key: string]: Array<{ name: string, selected: boolean }>});
    const [inputValue, setInputValue] = useState("");
    const filteredTagList = tags[tagType].filter((item) => item.name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
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
        area: CropFree,
        functionType: SettingsEthernet,
        tag: LocalOffer,
    }[tagType];

    const toggleTag = useCallback((tagType: ITagType, tagName: string) => {
        setTags((tags) => ({
            ...tags,
            [tagType]: tags[tagType].map((tag) => tag.name === tagName ? ({
                name: tag.name,
                selected: !tag.selected,
            }) : tag),
        }));
    }, []);
    return (
        <div
            style={{ position: "absolute", top: 5, left: 10, width: 400, border: "1px solid #ccc", display: "flex", flexDirection: "column", alignItems: "flex-start", borderRadius: 20, boxShadow: "#aaa 0px 0px 3px", overflow: "hidden" }} 
            
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
                    <MenuItem onClick={() => { selectMenu("textContained"); }}>文字片段</MenuItem>
                    <MenuItem onClick={() => { selectMenu("area"); }}>区域</MenuItem>
                    <MenuItem onClick={() => { selectMenu("functionType"); }}>功能区域</MenuItem>
                    <MenuItem onClick={() => { selectMenu("tag"); }}>标签</MenuItem>
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
                        if (event.keyCode === 13) {
                            setSearchTagList(inputValue);
                            (inputRef.current as any).value = "";
                            setInputValue("");
                        }
                    }}
                />
            </div>
            <div style={{ width: "100%", backgroundColor: "white" }}>
                {
                    inputFocused && filteredTagList.map(({ name, selected }, index) => (
                        <MenuItem style={{ width: "100%", height: 40, padding: 0 }} onClick={() => toggleTag(tagType, name)}>
                            <Checkbox checked={selected} style={{ width: 40, height: 40, padding: 0, margin: 0 }}/>
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

