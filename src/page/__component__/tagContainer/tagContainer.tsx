import React from 'react';

interface IPropType {
    title: string;
    deleteTagList: (tagList: string[]) => void;
    tagList: string[];
}

export default function TagContainer({ title, deleteTagList, tagList }: IPropType) {
    //  need a container
    //  a collapse and 
    return (
        <div>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                {title}
                <div>

                </div>
            </div>
            <div>
                
            </div>
        </div>
    );
} 
