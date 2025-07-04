import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, IconButton, Box
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import './Login.css';
import axios from "axios";

function LoginDialog({ open, handleClose, onLoginSuccess }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const url = "https://api.kacagider.net";

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        setPasswordError(value.length >= 5 ? "" : "Password should be at least 5 characters!");
    };

    const handleLogin = () => {
        if (!username || !password || passwordError) {
            if (!password) setPasswordError("Şifre boş olamaz");
            return;
        }

        try {
            axios.post(`${url}/login`, {
                username,
                password,
            }, { withCredentials: true }).then(r => {
                if (r.data.message === "Login successful") {
                    onLoginSuccess(username);
                    handleClose();
                } else if (r.data.message === "Invalid username or password") {
                    setPasswordError("Kullanıcı adı veya şifre hatalı");
                } else {
                    setPasswordError("Bilinmeyen bir hata oluştu");
                }
            });
        } catch (e) {
            console.error("Login error:", e);
            setPasswordError("Sunucu hatası oluştu");
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
            <DialogTitle className={'register-dialog-title'} sx={{ py: 1, px: 2 }}>
                Login
                <IconButton onClick={handleClose} sx={{ color: "#fff" }}>
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
                        onChange={handleUsernameChange}
                        className={'input'}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        size="small"
                        value={password}
                        onChange={handlePasswordChange}
                        className={'input'}
                        error={!!passwordError}
                        helperText={passwordError}
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
