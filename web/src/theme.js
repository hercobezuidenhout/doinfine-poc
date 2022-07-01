import { createTheme } from "@mui/material"

export const lightPalette = ({
    primary: {
        main: '#FBE4E4',
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
        main: '#594141',
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
    }
})