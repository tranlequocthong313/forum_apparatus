import { Box, Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import NavBar from "../components/common/NavBar";

const MainLayout: React.FC = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <NavBar />
            <Container  component="main" sx={{ flexGrow: 1, py: 3, width: '80%' }}>
                <Outlet />
            </Container>
            <Footer />
        </Box>
    );
}

export default MainLayout;