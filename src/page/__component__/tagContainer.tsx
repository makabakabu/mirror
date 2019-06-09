import React from 'react';

interface IPropType {
    deleteTagList: (tagList: string[]) => void;
    tagList: string[];
}

export default function TagContainer({ deleteTagList, tagList }: IPropType) {
    //  need a container
    // a collapse and 
    return (
        <div>
            something in it
        </div>
    );
} 
