import React from 'react'
import { NotificationsProvider } from '@toolpad/core/useNotifications'
import { Container, ThemeProvider } from '@mui/material'
import { CssBaseline } from '@mui/material'
import theme from './theme'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

// import logo from './logo.svg'
import Header from './components/common/Header'
// import NavBar from './components/common/NavBar'
import MainContent from './components/MainContent'
import Footer from './components/common/Footer'
import UserProvider from './providers/UserProvider'
// import SplitButton from './components/SplitButton'
// import './App.css';

function App() {
  return (
    <NotificationsProvider>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <CssBaseline />
          <Header />
          {/* <NavBar /> */}
          {/* <SplitButton /> */}
          <Container maxWidth="lg" sx={{ mt: 3, mb: 3 }}>
            <MainContent />
          </Container>
          <Footer />
        </UserProvider>
      </ThemeProvider>
    </NotificationsProvider>
  )
}

export default App
