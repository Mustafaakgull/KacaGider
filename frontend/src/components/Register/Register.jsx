import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import './Register.css'
import ReCAPTCHA from "react-google-recaptcha";


function RegisterDialog({ open, handleClose }) {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    function onChange(value) {
        console.log("Captcha value:", value);
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
                        variant="outlined"
                        fullWidth
                        size="small" // Smaller input size
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={'input'}
                    />
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