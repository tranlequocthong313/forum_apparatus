import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

function Footer() {
    return (
        <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
            <Container maxWidth='lg'>
                <Typography variant="body2" color="text.secondary" align="center">
                    {'Copyright ©'}
                    {new Date().getFullYear()}
					{' '}
                    <Link color="inherit" href="https://voz.vn/">
						Apparatus Forum
                    </Link>
                    {'.'}
                </Typography>
            </Container>
        </Box>
    );
}

export default Footer;
