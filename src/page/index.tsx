import React, { useEffect } from 'react';
import TagSideBar from "./tagSideBar";
import FilterSideBar from "./filterSideBar";
import BodyFilter from "./bodyFilter";
import Body from "./body";

export default function APP() {
    useEffect(() => {

    });
    return (
        <div style={{ position: "relative" }}>
            <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", display: "flex" }}>
                <TagSideBar />
                <FilterSideBar />
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <BodyFilter />
                    <Body />
                </div>
            </div>
        </div>
    );
}
