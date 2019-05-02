import React from 'react';
import { InputBase } from "@material-ui/core";
import { Search } from "@material-ui/icons";

export default function Index() {
    return (
        <div style={{ width: 0.8 * window.innerWidth, height: "100px", background: "#989898" }}>
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
        </div>
    );
} 

const styles = {
    searchIcon: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}