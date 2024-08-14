import React, {Suspense} from 'react';
import {Container, ThemeProvider} from '@mui/material';
import {CssBaseline} from "@mui/material";
import theme from "./theme";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import logo from './logo.svg';
import Header from "./components/common/Header";
import NavBar from "./components/common/NavBar";
import MainContent from "./components/MainContent";
import Footer from "./components/common/Footer";
import SplitButton from "./components/SplitButton";
import ErrorBoundary from './components/common/ErrorBoundary';
import {AuthProvider} from "./contexts/AuthContext";
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import Loading from "./components/common/Loading";
import routes, {AppRoute} from "./routes/routes";
import ProtectedRoute from "./routes/ProtectedRoute";

// import './App.css';


const renderRoutes = (routes: AppRoute[]): React.ReactNode => {
    return routes.map((route) => (
        <Route
            key={route.path}
            path={route.path}
            element={
                route.requireAuth ? (
                    <ProtectedRoute>{route.element}</ProtectedRoute>
                ) : (
                    route.element
                )
            }
        >
            {route.children && renderRoutes(route.children)}
        </Route>
    ));
};


function App() {
    return (
        // <ThemeProvider theme={theme}>
        //     <CssBaseline/>
        //     <Header/>
        //     <NavBar/>
        //     <SplitButton/>
        //     <Container maxWidth="laptop" sx={{mt: 3, mb: 3}}>
        //         <MainContent/>
        //     </Container>
        //     <Footer/>
        // </ThemeProvider>


        <ThemeProvider theme={theme}>
            <CssBaseline />
            <ErrorBoundary>
                <AuthProvider>
                    <BrowserRouter>
                        <Suspense fallback={<Loading />}>
                            <Routes>{renderRoutes(routes)}</Routes>
                        </Suspense>
                    </BrowserRouter>
                </AuthProvider>
            </ErrorBoundary>
        </ThemeProvider>
    );
}

export default App;
