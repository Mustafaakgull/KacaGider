import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import './Register.css'
import axios from "axios";
import {useState} from "react";


const url = "https://api.kacagider.net";

function RegisterDialog({ open, handleClose, openVerifyCodeDialog, setUsername, setEmail, setPassword, username, email, password }) {

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");


    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === "username") {
            setUsername(value);
        } else if (name === "email") {
            setEmail(value);
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setEmailError(emailRegex.test(value) ? "" : "Enter a valid email address");
        } else if (name === "password") {
            setPassword(value);
            setPasswordError(value.length >= 5 ? "" : "Password should be at least 5 characters");
        }
    };




    const handleRegister = () => {
        if (!email || !username || !password || emailError || passwordError) {
            return;
        }

        const data = { username, password, email };
        try {
            axios.post(url + '/register', data).then(r => r);
            handleClose();
            openVerifyCodeDialog();
        } catch (error) {
            console.error("Error during registration:", error);
        }
    };



    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="xs"
            PaperProps={{
                sx: {
                    backgroundColor: "#242424",
                    color: "#fff",
                    borderRadius: "12px",
                    padding: 1,
                    width: "100%",
                    border: "2px solid rgb(251, 191, 36)",
                }
            }}
        >
            <DialogTitle  className={'register-dialog-title'} sx={{ py: 1, px: 2 }}>
                Register
                <IconButton onClick={handleClose} sx={{ color: "#fff" }} >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ px: 2, py: 1 }}> {/* Reduced padding */}
                <Box className={'form-box'} sx={{ gap: 1.5 }}> {/* Reduced gap */}
                    <TextField
                        label="E-Mail"
                        name="email"
                        variant="outlined"
                        fullWidth
                        size="small"
                        value={email}
                        onChange={handleChange}
                        className={'input'}
                        error={!!emailError}
                        helperText={emailError}
                    />

                    <TextField
                        label="Username"
                        name="username"
                        variant="outlined"
                        fullWidth
                        size="small"
                        value={username}
                        onChange={handleChange}
                        className={'input'}
                    />

                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        size="small"
                        value={password}
                        onChange={handleChange}
                        className={'input'}
                        error={!!passwordError}
                        helperText={passwordError}
                    />


                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 2, pb: 2 }}>
                <Button onClick={handleRegister}
                    fullWidth
                    variant="contained"
                    sx={{
                        backgroundColor: "#fbc02d",
                        color: "#000",
                        fontWeight: "bold",
                        borderRadius: "8px",
                        mx: 0,
                        py: 1
                    }}
                >
                    Register
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default RegisterDialog;