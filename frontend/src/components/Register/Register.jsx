import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import './Register.css'
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";


const url = "http://127.0.0.1:5000";

function RegisterDialog({ open, handleClose, openVerifyCodeDialog }) {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [captchaToken, setCaptchaToken] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "username") {
            setUsername(value);
        } else if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        } else if (name === "captcha") {
            setCaptchaToken(value);
        }
    }


    const handleRegister = () => {
        if (!email || !username || !password) {
            alert("Please fill in all fields");
            return;
        }
        try {
            axios.post(url + '/register', {
                email: email,
            }).then(r => alert(r))
        }
        catch (error) {
            console.error("Error during registration:", error);
        }

        handleClose();
        openVerifyCodeDialog();
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
                    />
                    <ReCAPTCHA
                        sitekey="6LdQ0PIqAAAAAI7ot30prHy0ue9j9O2Ly5TeYzWB"
                        onChange={handleChange}
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