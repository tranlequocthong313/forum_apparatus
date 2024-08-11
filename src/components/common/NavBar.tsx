import React from 'react';
import { Paper, Tabs, Tab } from '@mui/material';

function NavBar() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
        setValue(newValue);
    };

    return (
        <Paper square>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"

            >
                <Tab label="Trang chủ" />
                <Tab label="Diễn đàn" />
                <Tab label="Blogs" />
                <Tab label="Thảo luận" />
                <Tab label="Hỏi đáp" />
                <Tab label="Tin tức" />
            </Tabs>
        </Paper>
    );
}

export default NavBar;