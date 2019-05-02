import React from 'react';
import Card from "./card";
import { InputBase } from "@material-ui/core";
import { Search } from "@material-ui/icons";

export default function Index() {
    return (
        <div style={{ height: window.innerHeight, width: 200, color: "white" }}>
            <div
                style={{
                    border: "1px solid black", display: "flex", alignItems: "center"
                }}
            >
                <div style={styles.searchIcon}>
                    <Search />
                </div>
                <InputBase
                    placeholder="Search…"
                />
            </div>
            <Card />
        </div>
    );
};

const styles = {
    searchIcon: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}