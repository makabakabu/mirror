import React, { useState, useContext } from 'react';
import { Collapse, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { StarBorder, ExpandLess, ExpandMore, MoveToInbox } from "@material-ui/icons";
import { Context } from "../../index";

export default function Tag() {
    const [visibility, setVisibility] = useState(false);
    const { tagSideBarWidth } = useContext(Context);
    return (
        <div style={{ height: "100%", width: tagSideBarWidth, backgroundColor: "yellow", overflow: "hidden" }}>
            <ListItem button onClick={() => setVisibility(visibility => !visibility)}>
                <ListItemIcon>
                    <MoveToInbox />
                </ListItemIcon>
                <ListItemText inset primary="Inbox" />
                {visibility ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={visibility} timeout="auto" unmountOnExit>
                <List component="dl" disablePadding>
                    <ListItem button>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText inset primary="Starred" />
                    </ListItem>
                </List>
            </Collapse>
        </div>
    );
};