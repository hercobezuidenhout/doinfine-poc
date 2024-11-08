import { createTheme } from "@mui/material"
import { red } from "@mui/material/colors"
import { createContext } from "react"

export const lightPalette = ({
    primary: {
        light: red[200],
        main: '#E03E3E',
        dark: '#E03E3E'
    },
    secondary: {
        main: '#E9E5E3'
    },
    error: {
        main: '#FBE4E4'
    },
    warning: {
        main: '#FAEBDD'
    },
    info: {
        main: '#DDEBF1'
    },
    success: {
        main: '#DDEDEA'
    }
})

export const darkPallete = ({
    primary: {
        light: red[400],
        main: '#E03E3E',
        dark: '#FF7369'
    },
    secondary: {
        main: '#434040'
    },
    error: {
        main: '#594141'
    },
    warning: {
        main: '#594A3A'
    },
    info: {
        main: '#364954'
    },
    success: {
        main: '#354C4B'
    }
})

export const corporateTheme = (mode) => createTheme({
    palette: {
        mode,
        ...(mode === 'light' ? lightPalette : darkPallete)
    },
    typography: {
        h1: {
            fontSize: '3rem'
        },
        h2: {
            fontSize: '2rem'
        },
        h3: {
            fontSize: '1.5rem'
        },
        h4: {
            fontSize: '1.3rem'
        },
        h5: {
            font: '1rem'
        },
        h6: {
            fontSize: '0.8rem',
            fontWeight: 'bold',
            textTransform: 'uppercase'
        }
    }
})

export const CorporateContext = createContext({
    mode: 'light',
    setMode: () => { }
})