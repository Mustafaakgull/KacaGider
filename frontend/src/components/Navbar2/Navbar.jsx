import './Navbar.css';
import * as React from 'react';
import { useNavigate } from 'react-router-dom'; // en üstte


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
import {Button, Container, Menu, MenuItem} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import RegisterDialog from "../Register/Register.jsx"
import VerifyCodeDialog from "../VerifyCode/VerifyCode.jsx"
import LoginDialog from "../Login/Login.jsx"
import EditProfileDialog from '../EditProfile/EditProfile.jsx';
import {useContext, useEffect, useState} from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { SocketContext } from '../../SocketioConnection.jsx';

import axios from "axios";

function Navbar() {
    const socket = useContext(SocketContext);
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const navigate = useNavigate(); // Navbar fonksiyonu içinde


    const [registerUsername, setRegisterUsername] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const [anchorEl, setAnchorEl] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);



    const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
    const [verifyCodeDialogOpen, setVerifyCodeDialogOpen] = useState(false);
    const [loginDialogOpen, setLoginDialogOpen] = useState(false);

    const [loggedInUser, setLoggedInUser] = useState(null);

  const [disabled, setDisabled] = useState(false);


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
    useEffect(() => {
        socket.emit("current_user")
        socket.on("current_user_username", (data) => {
            if (data === "none"){
                setLoggedInUser(null)
            }
            else {
                setLoggedInUser(data)

            }

        })
         return () => {
        socket.off("current_user_username");
    };
  }, []);

    useEffect(() => {
    if (disabled) return;  // stop running if disabled

        try {
            axios.post('https://api.kacagider.net/whoami', {}, { withCredentials: true }
            ).then(response => {
                if (response.data.username !== null){
                    setLoggedInUser(response.data.username)
      setDisabled(true);

                }
            });

        } catch (e) {
            console.error(e);
        }
  },);

    return (
        <>
            <AppBar position="fixed" className="navbar">
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{justifyContent: 'space-between'}}>
                        <Box
                            sx={{ flexDirection: 'row', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                            onClick={() => navigate('/')} // 👈 hem ikon hem yazı tıklanır
                        >
                            <PriceCheckIcon fontSize="large" sx={{ mr: 2 }} />
                            <Typography
                                variant="h6"
                                noWrap
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
                                KACA GIDER
                            </Typography>
                        </Box>


                        <Box sx={{display: {xs: 'none', md: 'flex'}, flexDirection: 'row', alignItems: 'center'}}>


                            {loggedInUser ? (
                                <Box sx={{ mr: 2 }} className="cup">
                                    <Button onClick={(e) => setAnchorEl(e.currentTarget)}>
                                        <Typography sx={{ color: "white", fontWeight: "bold" }}>
                                            Welcome, {loggedInUser}
                                        </Typography>
                                    </Button>

                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={() => setAnchorEl(null)}
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                                        PaperProps={{
                                            sx: {
                                                backgroundColor: '#1e1e1e',
                                                borderRadius: 2,
                                                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
                                                color: 'white',
                                                minWidth: 180,
                                                mt: 1
                                            }
                                        }}
                                        MenuListProps={{
                                            sx: {
                                                padding: 0
                                            }
                                        }}
                                    >
                                        <MenuItem
                                            onClick={() => {
                                                setEditDialogOpen(true);
                                                setAnchorEl(null);
                                            }}
                                            sx={{
                                                paddingY: 1.5,
                                                paddingX: 2,
                                                '&:hover': {
                                                    backgroundColor: '#FFC107',
                                                    color: '#000',
                                                },
                                            }}
                                        >
                                            <SettingsIcon sx={{marginRight: 2}} fontSize="medium"/>
                                            Edit Profile
                                        </MenuItem>
                                        <MenuItem
                                            onClick={async () => {
                                                await axios.post("https://api.kacagider.net/logout", {}, { withCredentials: true }
                                                )
                                                setLoggedInUser(null);
                                                setAnchorEl(null);
                                            }}
                                            sx={{
                                                paddingY: 1.5,
                                                paddingX: 2,
                                                '&:hover': {
                                                    backgroundColor: '#FFC107',
                                                    color: '#000',
                                                },
                                            }}
                                        >
                                            <LogoutIcon sx={{marginRight: 2}} color={"warning"} fontSize="medium"/>
                                            Log Out
                                        </MenuItem>
                                    </Menu>

                                </Box>

                            ) : (
                                <>
                                    <Box sx={{mr: 2}} className="cup" onClick={openRegisterDialog}>
                                        <PersonAddIcon className="cup-icon" fontSize="large"/>
                                        <p className="point">Register</p>
                                    </Box>
                                    <Box sx={{mr: 2}} className="cup" onClick={openLoginDialog}>
                                        <LoginIcon className="cup-icon" fontSize="large"/>
                                        <p className="login-btn">Login</p>
                                    </Box>
                                </>
                            )}


                        </Box>
                    </Toolbar>
                </Container>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <Box sx={{display: {xs: 'flex', md: 'none'}, flexDirection: 'column', alignItems: 'center'}}>

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
                onVerifySuccess={(username) => setLoggedInUser(username)}
            />
            <LoginDialog open={loginDialogOpen} handleClose={closeLoginDialog}
                         onLoginSuccess={(username) => setLoggedInUser(username)}/>
            <EditProfileDialog
                open={editDialogOpen}
                onClose={() => setEditDialogOpen(false)}
                email={registerEmail}
                onUpdateSuccess={(newUsername) => setLoggedInUser(newUsername)}
            />

        </>
    );
}

export default Navbar;
