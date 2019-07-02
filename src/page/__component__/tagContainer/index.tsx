import React, { useState } from 'react';
import Tag from "./tag";
import { takeWhile } from "lodash";
import stringWidth from "string-width";
import { ExpandLess, ExpandMore } from '@material-ui/icons';


interface IPropType {
    title: string;
    deleteTagList: (tagList: string[]) => void;
    tagList: string[];
}

export default function TagContainer({ title, deleteTagList, tagList }: IPropType) {
    // 如果长度不够则显示一行， 如果长度超出一行 在行末显示下拉按钮
    // 一个tag的宽度是本身宽度
    const [open, setOpen] = useState(false);
    const currentTagList = open ? tagList : takeWhile(tagList, (_, index) => (index * 30 + stringWidth(tagList.slice(0, index + 1).join("")) * 6) < ((window.innerWidth - 500) / 3 - 80));
    return (
        <div style={{ maxWidth: (window.innerWidth - 500) / 3, overflow: "hidden" }}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", flexWrap: "wrap" }}>
                <p style={{ padding: 0, minWidth: 40 }}>{title}</p>
                {
                    currentTagList.map((certainTag) => <Tag content={certainTag} deleteTag={() => { deleteTagList([certainTag]) }} />)
                }
                {
                    (tagList.length > currentTagList.length || open) && <div style={{ minWidth: 40 }}>
                        {
                            open ? <ExpandLess onClick={() => setOpen(false)} /> : <ExpandMore onClick={() => setOpen(true)} />
                        }
                    </div>
                }
            </div>
            <div>

            </div>
        </div>
    );
} 
