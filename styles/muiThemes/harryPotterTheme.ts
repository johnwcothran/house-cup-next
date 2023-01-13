import { createTheme } from "@mui/material/styles";
import { yellow } from '@mui/material/colors';

declare module '@mui/material/TextField' {
    interface TextFieldPropsSizeOverrides {
      large: true;
    }
}

const baseTheme = createTheme();

export const theme = createTheme({
    typography: {
        fontFamily: 'Garamond',
        h1: {
            fontFamily: `'Henny Penny', cursive`,
            [baseTheme.breakpoints.up('xs')]: {
                fontSize: '3.0rem',
            },
            [baseTheme.breakpoints.up('md')]: {
                fontSize: '4.0rem',
            },
        },
        h4: {
            fontFamily: `'Henny Penny', cursive`,
            [baseTheme.breakpoints.up('xs')]: {
                fontSize: '1.2rem',
            },
            [baseTheme.breakpoints.up('md')]: {
                fontSize: '2.0rem',
            },
        }
    },
    palette: {
        mode: 'dark',
        primary: {
            main: yellow[400],
        },
    },
    components: {
        MuiTextField: {
            variants: [
                {
                    props: { size: 'large' },
                    style: {
                        input: {
                            fontSize: '1.5rem',
                            textAlign: 'center'
                        },
                        label: {
                            fontSize: '1.5rem',
                            textAlign: 'center',
                            width: '100%',
                            "&.Mui-focused": {
                                transform: 'translate(70px, -9px) scale(0.75)'
                            },
                            "&.MuiInputLabel-shrink": {
                                transform: 'translate(70px, -9px) scale(0.75)'
                            }
                        },
                        legend: {
                            fontSize: '1.15rem',
                            textAlign: 'center',
                            transform: 'translate(70px, -9px) scale(0.75)'
                        },
                        
                    },
                  },
                  {
                    props: { size: 'large', color: 'primary' },
                    style: {
                        input: {
                            fontSize: '1.5rem',
                            textAlign: 'center',
                            borderColor: yellow[400]
                        },
                        label: {
                            fontSize: '1.5rem',
                            textAlign: 'center',
                            width: '100%',
                            "&.Mui-focused": {
                                transform: 'translate(70px, -9px) scale(0.75)'
                            },
                            "&.MuiInputLabel-shrink": {
                                transform: 'translate(70px, -9px) scale(0.75)'
                            }
                        },
                        legend: {
                            fontSize: '1.15rem',
                            textAlign: 'center',
                            transform: 'translate(70px, -9px) scale(0.75)'
                        },
                        
                    },
                  },
            ]
        },
        MuiButton: {
            variants: [
                {
                    props: { size: 'large' },
                    style: {
                        fontSize: '1.5rem',
                    },
                  },
            ]
        }
    }
});