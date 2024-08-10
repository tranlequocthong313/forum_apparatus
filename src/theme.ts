import {createTheme} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#344966',
            light: '#B4CDED',
            dark: '#0D1821',
            contrastText: '#F0F4EF',
        },
        secondary: {
            main: '#BFCC94',
            contrastText: '#0D1821',
        },
        background: {
            default: '#F0F4EF',
            paper: '#B4CDED',
        },
        text: {
            primary: '#0D1821',
            secondary: '#344966',
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, san-serif'
    }
})

export default theme;