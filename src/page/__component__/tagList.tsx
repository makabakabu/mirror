import React from 'react';

export default function TagList({
    tagNameList
}: { tagNameList: string[]}) {
    return (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
            {
                tagNameList.map((certainName, index) => <p key={index} style={{ margin: 5 }}>#{certainName}</p>)
            }
        </div>
    );
} 
