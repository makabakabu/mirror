import React from 'react';
import { Close } from "@material-ui/icons";

export default function Tag({ content, deleteTag }: { content: string, deleteTag: () => void }) {
    return (
        <div onClick={deleteTag} style={{ fontSize: 12, backgroundColor: "#aaa", cursor: "pointer", color: "white", height: 20, borderRadius: 10, paddingLeft: 10, paddingRight: 10, display: "flex", flexDirection: "row", alignItems: "center" }}>
            {content}✕
        </div>
    );
} 
