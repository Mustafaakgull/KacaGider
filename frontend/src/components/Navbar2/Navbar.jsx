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
import {Container} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import RegisterDialog from "../Register/Register.jsx"
import VerifyCodeDialog from "../VerifyCode/VerifyCode.jsx"
import LoginDialog from "../Login/Login.jsx"
import {useState} from "react";

function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    const [registerUsername, setRegisterUsername] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
    const [verifyCodeDialogOpen, setVerifyCodeDialogOpen] = useState(false);
    const [loginDialogOpen, setLoginDialogOpen] = useState(false);

    const openRegisterDialog = () => {
        setRegisterDialogOpen(true);
    };

    const closeRegisterDialog = () => {
        setRegisterDialogOpen(false);
    };

    const openLoginDialog = () => {
        setLoginDialogOpen(true);
    }

    const closeLoginDialog = () => {
        setLoginDialogOpen(false);
    }

    return (
        <>
            <AppBar position="fixed" className="navbar">
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{justifyContent: 'space-between'}}>
                        <Box sx={{flexDirection: 'row', display: 'flex', alignItems: 'center'}}>
                            <PriceCheckIcon fontSize="large" sx={{mr: 2}}/>
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                sx={{
                                    mr: 2,
                                    display: {xs: 'none', md: 'flex'},
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                KACA GIDER???
                            </Typography>
                        </Box>
                        <Box sx={{display: {xs: 'none', md: 'flex'}, flexDirection: 'row', alignItems: 'center'}}>
                            <Box className="user-rooms-box" sx={{mr: 2}}>
                                <PeopleAltOutlinedIcon className="user-icon" fontSize="large"/>
                                <p className="user-rooms">User Rooms denemepush</p>
                            </Box>
                            <Box sx={{mr: 2}} className="cup" onClick={openRegisterDialog}>
                                <PersonAddIcon className="cup-icon" fontSize="large"/>
                                <p className="point">Register</p>
                            </Box>
                            <Box sx={{mr: 2}} className="cup" onClick={openLoginDialog}>
                                <LoginIcon className="cup-icon" fontSize='large'  />
                                <p className="login-btn">Login</p>
                            </Box>
                            <Box sx={{mr: 2}} className="box">
                                <LightModeOutlinedIcon fontSize="large"/>
                            </Box>
                            <Box sx={{mr: 2}} className="box">
                                <NotificationsNoneOutlinedIcon fontSize="large"/>
                            </Box>
                        </Box>
                    </Toolbar>
                </Container>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <Box sx={{display: {xs: 'flex', md: 'none'}, flexDirection: 'column', alignItems: 'center'}}>
                        <Box className="mobile-menu-item">
                            <IconButton className="icon">
                                <PeopleAltOutlinedIcon className="user-icon" fontSize="large"/>
                                <p className="user-rooms">User Rooms</p>
                            </IconButton>
                        </Box>
                        <Box sx={{mr: 2}} className="cup">
                            <IconButton className="icon">
                                <EmojiEventsOutlinedIcon className="cup-icon" fontSize="large"/>
                            </IconButton>
                            <p className="point">6824</p>
                        </Box>
                        <Box sx={{mr: 2}} className="box">
                            <IconButton className="icon">
                                <p className="welcome-musdo">Welcome MUSDO</p>
                            </IconButton>
                        </Box>
                        <Box sx={{mr: 2}} className="box">
                            <IconButton className="icon">
                                <LightModeOutlinedIcon fontSize="large"/>
                            </IconButton>
                        </Box>
                        <Box sx={{mr: 2}} className="box">
                            <IconButton className="icon">
                                <NotificationsNoneOutlinedIcon fontSize="large"/>
                            </IconButton>
                        </Box>
                    </Box>
                )}
            </AppBar>

            <RegisterDialog
                open={registerDialogOpen}
                handleClose={closeRegisterDialog}
                openVerifyCodeDialog={() => setVerifyCodeDialogOpen(true)}
                setUsername={setRegisterUsername}
                setEmail={setRegisterEmail}
                setPassword={setRegisterPassword}
                username={registerUsername}
                email={registerEmail}
                password={registerPassword}
            />

            <VerifyCodeDialog
                open={verifyCodeDialogOpen}
                handleClose={() => setVerifyCodeDialogOpen(false)}
                username={registerUsername}
                email={registerEmail}
                password={registerPassword}
            />
            <LoginDialog open={loginDialogOpen} handleClose={closeLoginDialog}/>
        </>
    );
}

export default Navbar;
