import { ThemeOptions } from '@mui/material/styles';

const darkThemeOptions: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: '#fbfbfb',
            contrastText: 'rgba(37,28,28,0.87)',
        },
        secondary: {
            main: '#1c4ca0',
        },
        error: {
            main: '#f44336',
        },
        text: {
            secondary: 'rgba(41,38,38,0.54)',
        },
    },
    components: {
        MuiBottomNavigationAction: {
            styleOverrides: {
                root: {
                    "&.Mui-selected": {
                        color: "#0288d1"
                    }
                }
            }
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    "&.Mui-selected": {
                        color: "#0288d1"
                    }
                }
            }
        }
    }
};

export default darkThemeOptions;