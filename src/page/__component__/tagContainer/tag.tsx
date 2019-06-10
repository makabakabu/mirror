import React from 'react';
import { Close } from "@material-ui/icons";

export default function Tag({ content, deleteTag }: { content: string, deleteTag: () => void }) {
    return (
        <div style={{ position: "relative", height: 20 }}>
            <div onClick={deleteTag} style={{ position: "absolute", left: 0, top: 0, width: 20, height: 20, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "red" }}>
                <Close style={{ color: "white" }} />
            </div>
            <div style={{ paddingLeft: 20, paddingRight: 10, display: "flex", alignItems: "center", borderTopRightRadius: 10, borderBottomRightRadius: 10 }}>{ content }</div>
        </div>
    );
} 
