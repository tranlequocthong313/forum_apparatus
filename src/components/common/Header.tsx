import {AppBar, IconButton, Toolbar, Typography, InputBase} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import React from "react";

function Header() {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1}}>
                    VOZ
                </Typography>

                <div>
                    <InputBase
                        placeholder="Search..."
                        inputProps={{ 'aria-label': 'search'}}
                    />
                    <IconButton color="inherit">
                        <SearchIcon/>
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Header;