import React, { useState } from 'react';
import { Collapse, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { StarBorder, ExpandLess, ExpandMore, MoveToInbox } from "@material-ui/icons";

export default function Index() {
    const [visibility, setVisibility] = useState(false);
    return (
        <>
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
        </>
    );
};