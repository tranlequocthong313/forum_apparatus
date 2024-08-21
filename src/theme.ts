import {createTheme, ThemeOptions} from "@mui/material";

declare module '@mui/material/styles' {
    interface Palette {
        neutral: {
            main?: string;
        };
    }
    interface PaletteOptions {
        neutral: {
            main?: string;
        }
    }

}
declare module '@mui/material/styles' {
    interface BreakpointOverrides {
        xs: false; // removes the `xs` breakpoint
        sm: false;
        md: false;
        lg: false;
        xl: false;
        mobile: true; // adds the `mobile` breakpoint
        tablet: true;
        laptop: true;
        desktop: true;
    }
}

const typography = {
    fontFamily: 'Roboto, Arial, san-serif',
    h1: {
        fontSize: '2rem',
        '@media (min-width:640px)': {
            fontSize: '2.5rem',
        },
        '@media (min-width:1024px)': {
            fontSize: '3rem',
        },
    },
    h2: {
        fontSize: '1.75rem',
        '@media (min-width:640px)': {
            fontSize: '2rem',
        },
        '@media (min-width:1024px)': {
            fontSize: '2.5rem',
        },
    },
    h3: {
        fontSize: '1.5rem',
        '@media (min-width:640px)': {
            fontSize: '1.75rem',
        },
        '@media (min-width:1024px)': {
            fontSize: '2rem',
        },
    },
    h4: {
        fontSize: '1.25rem',
        '@media (min-width:640px)': {
            fontSize: '1.5rem',
        },
        '@media (min-width:1024px)': {
            fontSize: '1.75rem',
        },
    },
    h5: {
        fontSize: '1.1rem',
        '@media (min-width:640px)': {
            fontSize: '1.25rem',
        },
        '@media (min-width:1024px)': {
            fontSize: '1.5rem',
        },
    },
    h6: {
        fontSize: '1rem',
        '@media (min-width:640px)': {
            fontSize: '1.1rem',
        },
        '@media (min-width:1024px)': {
            fontSize: '1.25rem',
        },
    },
    body1: {
        fontSize: '0.8rem',
        '@media (min-width:640px)': {
            fontSize: '0.85rem',
        },
        '@media (min-width:1024px)': {
            fontSize: '0.9rem',
        },
    },
    body2: {
        fontSize: '0.75rem',
        '@media (min-width:640px)': {
            fontSize: '0.8rem',
        },
        '@media (min-width:1024px)': {
            fontSize: '0.85rem',
        },
    },
    button: {
        fontSize: '0.8rem',
        '@media (min-width:640px)': {
            fontSize: '0.9rem',
        },
    },
    caption: {
        fontSize: '0.7rem',
        '@media (min-width:640px)': {
            fontSize: '0.8rem',
        },
    },
    overline: {
        fontSize: '0.7rem',
        '@media (min-width:640px)': {
            fontSize: '0.8rem',
        },
    },
}

const breakpoints = {
    values: {
        mobile: 0,
        tablet: 640,
        laptop: 1024,
        desktop: 1200,
    },
}


const lightThemeOptions: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: '#344966',
        },
        secondary: {
            main: '#B4CDED',
        },
        background: {
            default: '#F0F4EF',
            paper: '#FFFFFF',
        },
        error: {
            main: '#B00020',
        },
        text: {
            primary: '#000000',
            secondary: '#5c6d84',
        },
        neutral: {
            main: '#5c6d84'
        }
    },
    typography,
    breakpoints
};

const darkThemeOptions: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: '#B4CDED',
        },
        secondary: {
            main: '#BFCC94',
        },
        background: {
            default: '#0D1821',
            paper: '#5c6d84',
        },
        error: {
            main: '#CF6679',
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#B4CDED',
        },
        neutral: {
            main: '#5c6d84'
        }
    },
    typography,
    breakpoints
};

// const theme = createTheme({
//     palette: {
//         primary: {
//             main: '#344966',
//             light: '#B4CDED',
//             dark: '#0D1821',
//             contrastText: '#F0F4EF',
//         },
//         secondary: {
//             main: '#BFCC94',
//             contrastText: '#0D1821',
//         },
//         background: {
//             default: '#F0F4EF',
//             paper: '#B4CDED',
//         },
//         text: {
//             primary: '#0D1821',
//             secondary: '#344966',
//         },
//         neutral: {
//             main: '#5c6d84'
//         }
//     },
//     typography: {
//         fontFamily: 'Roboto, Arial, san-serif',
//         h1: {
//             fontSize: '2rem',
//             '@media (min-width:640px)': {
//                 fontSize: '2.5rem',
//             },
//             '@media (min-width:1024px)': {
//                 fontSize: '3rem',
//             },
//         },
//         h2: {
//             fontSize: '1.75rem',
//             '@media (min-width:640px)': {
//                 fontSize: '2rem',
//             },
//             '@media (min-width:1024px)': {
//                 fontSize: '2.5rem',
//             },
//         },
//         h3: {
//             fontSize: '1.5rem',
//             '@media (min-width:640px)': {
//                 fontSize: '1.75rem',
//             },
//             '@media (min-width:1024px)': {
//                 fontSize: '2rem',
//             },
//         },
//         h4: {
//             fontSize: '1.25rem',
//             '@media (min-width:640px)': {
//                 fontSize: '1.5rem',
//             },
//             '@media (min-width:1024px)': {
//                 fontSize: '1.75rem',
//             },
//         },
//         h5: {
//             fontSize: '1.1rem',
//             '@media (min-width:640px)': {
//                 fontSize: '1.25rem',
//             },
//             '@media (min-width:1024px)': {
//                 fontSize: '1.5rem',
//             },
//         },
//         h6: {
//             fontSize: '1rem',
//             '@media (min-width:640px)': {
//                 fontSize: '1.1rem',
//             },
//             '@media (min-width:1024px)': {
//                 fontSize: '1.25rem',
//             },
//         },
//         body1: {
//             fontSize: '0.8rem',
//             '@media (min-width:640px)': {
//                 fontSize: '0.85rem',
//             },
//             '@media (min-width:1024px)': {
//                 fontSize: '0.9rem',
//             },
//         },
//         body2: {
//             fontSize: '0.75rem',
//             '@media (min-width:640px)': {
//                 fontSize: '0.8rem',
//             },
//             '@media (min-width:1024px)': {
//                 fontSize: '0.85rem',
//             },
//         },
//         button: {
//             fontSize: '0.8rem',
//             '@media (min-width:640px)': {
//                 fontSize: '0.9rem',
//             },
//         },
//         caption: {
//             fontSize: '0.7rem',
//             '@media (min-width:640px)': {
//                 fontSize: '0.8rem',
//             },
//         },
//         overline: {
//             fontSize: '0.7rem',
//             '@media (min-width:640px)': {
//                 fontSize: '0.8rem',
//             },
//         },
//     },
//     breakpoints: {
//         values: {
//             mobile: 0,
//             tablet: 640,
//             laptop: 1024,
//             desktop: 1200,
//         },
//     },
// })
//
//
//
//
// export default theme;

export const lightTheme = createTheme(lightThemeOptions);
export const darkTheme = createTheme(darkThemeOptions);
