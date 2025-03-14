import './Navbar.css';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import MenuIcon from '@mui/icons-material/Menu';
import { Container } from "@mui/material";

function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <AppBar position="fixed" className="navbar">
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                    <Box sx={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                        <PriceCheckIcon fontSize="large" sx={{ mr: 2 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            KACA GIDER?
                        </Typography>
                    </Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'row', alignItems: 'center' }}>
                        <Box className="user-rooms-box" sx={{ mr: 2 }}>
                            <IconButton className="icon">
                                <PeopleAltOutlinedIcon className="user-icon" fontSize="large" />
                                <p className="user-rooms">User Rooms</p>
                            </IconButton>
                        </Box>
                        <Box sx={{ mr: 2 }} className="cup">
                            <IconButton className="icon">
                                <EmojiEventsOutlinedIcon className="cup-icon" fontSize="large" />
                            </IconButton>
                            <p className="point">6824</p>
                        </Box>
                        <Box sx={{ mr: 2 }} className="box">
                            <IconButton className="icon">
                                <p className="welcome-musdo">Welcome MUSDO</p>
                            </IconButton>
                        </Box>
                        <Box sx={{ mr: 2 }} className="box">
                            <IconButton className="icon">
                                <LightModeOutlinedIcon fontSize="large" />
                            </IconButton>
                        </Box>
                        <Box sx={{ mr: 2 }} className="box">
                            <IconButton className="icon">
                                <NotificationsNoneOutlinedIcon fontSize="large" />
                            </IconButton>
                        </Box>
                    </Box>
                    <IconButton
                        sx={{ display: { xs: 'flex', md: 'none' } }}
                        onClick={toggleMobileMenu}
                        className="menu-icon"
                    >
                        <MenuIcon fontSize="large" />
                    </IconButton>
                </Toolbar>
            </Container>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column', alignItems: 'center' }}>
                    <Box className="mobile-menu-item">
                        <IconButton className="icon">
                            <PeopleAltOutlinedIcon className="user-icon" fontSize="large" />
                            <p className="user-rooms">User Rooms</p>
                        </IconButton>
                    </Box>
                    <Box sx={{ mr: 2 }} className="cup">
                        <IconButton className="icon">
                            <EmojiEventsOutlinedIcon className="cup-icon" fontSize="large" />
                        </IconButton>
                        <p className="point">6824</p>
                    </Box>
                    <Box sx={{ mr: 2 }} className="box">
                        <IconButton className="icon">
                            <p className="welcome-musdo">Welcome MUSDO</p>
                        </IconButton>
                    </Box>
                    <Box sx={{ mr: 2 }} className="box">
                        <IconButton className="icon">
                            <LightModeOutlinedIcon fontSize="large" />
                        </IconButton>
                    </Box>
                    <Box sx={{ mr: 2 }} className="box">
                        <IconButton className="icon">
                            <NotificationsNoneOutlinedIcon fontSize="large" />
                        </IconButton>
                    </Box>
                </Box>
            )}
        </AppBar>
    );
}

export default Navbar;
