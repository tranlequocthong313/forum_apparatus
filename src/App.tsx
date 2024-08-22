import React, { Suspense, useState } from 'react';
import { Container, ThemeProvider } from '@mui/material';
import { CssBaseline } from "@mui/material";
import { lightTheme } from "./theme";
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
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Loading from "./components/common/Loading";
import routes, { AppRoute } from "./routes/routes";
import ProtectedRoute from "./routes/ProtectedRoute";
import FloatingBubble from './components/common/FloatingBubble';



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
	const [isDarkMode, setIsDarkMode] = useState(false);

	const toggleTheme = () => {
		setIsDarkMode(!isDarkMode);
	};

	return (
		<ThemeProvider theme={lightTheme}>
			<CssBaseline />
			<ErrorBoundary>
				<BrowserRouter>
					<Suspense fallback={<Loading />}>
						<Routes>{renderRoutes(routes)}</Routes>
					</Suspense>
				</BrowserRouter>
			</ErrorBoundary>
			<FloatingBubble icon={<img src="https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-Zalo-App-Rec.png" alt="Logo" style={{ width: '69px', height: '69px', borderRadius: '50%' }} />} link="https://zalo.me/0909943501" />
		</ThemeProvider>
	);
}

export default App;
