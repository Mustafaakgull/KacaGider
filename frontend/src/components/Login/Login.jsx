import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import './Login.css'
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";


function LoginDialog({ open, handleClose }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [captchaToken, setCaptchaToken] = useState(null);
    const url = "http://127.0.0.1:5000"
    function onChange(value) {
        console.log("Captcha value:", value);
    }

    const handleLogin=() => {
        if (captchaToken === null) {
            alert("Please complete the CAPTCHA");
        }
        try {
            axios.post(url + 'login', {
                username,
                password,
            }).then(r => {
                console.log(r.data);
                if (r.data === "Login successfully") {
                    alert("Login successfully");
                    handleClose();
                } else if (r.data === "Invalid username or password") {
                    alert("Invalid username or password");
                } else {
                    alert("Login failed");
                }
            });
            handleClose();
        } catch (e) {
            console.error("Login error:", e);
            alert("Login failed");
        }
    }

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
                Login
                <IconButton onClick={handleClose} sx={{ color: "#fff" }} >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ px: 2, py: 1 }}>
                <Box className={'form-box'} sx={{ gap: 1.5 }}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        size="small"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={'input'}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        size="small"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={'input'}
                    />
                    <ReCAPTCHA
                        sitekey="6LdQ0PIqAAAAAI7ot30prHy0ue9j9O2Ly5TeYzWB"
                        onChange={onChange}
                    />
                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 2, pb: 2 }}>
                <Button
                    onClick={handleLogin}
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
                    Login
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default LoginDialog;