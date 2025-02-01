import '../styles/ModeToggle.css'

import IconButton from "@mui/material/IconButton"
import DarkModeIcon from "@mui/icons-material/DarkMode"

export const ModeToggle = ({handleChange}) => {
    return (<>
        <IconButton
        id="dark-mode-button"
        onClick={handleChange}
        aria-label="Dark Mode"
        size="medium"
        className='toggle-dark'>
            <DarkModeIcon id="dark-mode-icon"/>
        </IconButton>
    </>)
}