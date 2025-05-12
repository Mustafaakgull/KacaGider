import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import './Register.css'
import ReCAPTCHA from "react-google-recaptcha";
import io from "socket.io-client"


const socket = io('http://localhost:5000');

function RegisterDialog({ open, handleClose }) {

    const [form, setForm] = useState({ username: "", email: "",password: "" })

    function onChange(value) {
        console.log("Captcha value:", value);
    }

    const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form)
    };


    function CheckInputs() {
    socket.emit("check_values", form)
    }
    function RegisterationResponse() {
        socket.on("registeration_response", (data) => {
           if (data.success === true) {
           // redirect to mini verification tab

           }
        })
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
                        size="small" // Smaller input size
                        value={form.email}
                        onChange={handleChange}
                        className={'input'}
                    />
                    <TextField
                        label="Username"
                        name="username"
                        variant="outlined"
                        fullWidth
                        size="small"
                        value={form.username}
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
                        value={form.password}
                        onChange={handleChange}
                        className={'input'}
                    />
                    <ReCAPTCHA
                        sitekey="6LdQ0PIqAAAAAI7ot30prHy0ue9j9O2Ly5TeYzWB"
                        onChange={onChange}
                    />
                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 2, pb: 2 }}>
                <Button onClick={CheckInputs}
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