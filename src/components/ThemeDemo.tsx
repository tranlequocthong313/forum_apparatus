import React from 'react';
import {Box, Typography, Button, Paper, AppBar, Toolbar} from '@mui/material';

function ThemeDemo() {
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Custom Theme Demo
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box sx={{p: 3}}>
                <Paper elevation={3} sx={{p: 3, mb: 3}}>
                    <Typography variant="h4" color="primary" gutterBottom>
                        Welcome to Our Custom Theme
                    </Typography>
                    <Typography variant="body1" paragraph>
                        This demo showcases our custom Material-UI theme.
                    </Typography>
                    <Button variant="contained" color="primary">
                        Primary Button
                    </Button>
                    <Button variant="contained" color="secondary" sx={{ml: 2}}>
                        Secondary Button
                    </Button>
                </Paper>
                <Box sx={{bgcolor: 'background.default', p: 2}}>
                    <Typography variant="body2" color="text.secondary">
                        This is the default background color.
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default ThemeDemo;