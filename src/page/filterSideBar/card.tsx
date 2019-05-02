import React, { useState } from 'react';
import { Card as CardContainer, CardHeader, IconButton, CardMedia, CardContent, Typography, Menu, MenuItem } from "@material-ui/core";
import { MoreVert  } from "@material-ui/icons";

export default function Card() {
    const [anchorElement, setAnchorElement] = useState(null as any);
    const visibility = Boolean(anchorElement)
    return (
        <CardContainer>
            <CardHeader
                action={
                    <div style={{ display: "flex"}}>
                        <IconButton aria-owns={visibility ? 'render-props-menu' : undefined} aria-haspopup="true" onClick={(event) => { setAnchorElement(event.currentTarget);}}>
                            <MoreVert />
                        </IconButton>
                        <Menu id="render-props-menu" anchorEl={anchorElement} open={visibility} onClose={() => { setAnchorElement(null); }}>
                            <MenuItem >Profile</MenuItem>
                            <MenuItem >My account</MenuItem>
                            <MenuItem >Logout</MenuItem>
                        </Menu>
                    </div>
                }
                title="Shrimp"
            />
            <CardMedia
                image="/static/images/cards/paella.jpg"
                title="Paella dish"
            />
            <CardContent>
                <Typography component="p">
                    This impressive paella is a perfect party dish and a fun meal to cook together with your
                    guests. Add 1 cup of frozen peas along with the mussels, if you like.
                </Typography>
            </CardContent>
        </CardContainer>
    );
} 
