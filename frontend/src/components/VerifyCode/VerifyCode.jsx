import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, Button, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {useEffect, useRef, useState} from "react";
import axios from "axios";

function VerifyCodeDialog({ open, handleClose, email, username, password, onVerifySuccess }) {
    const [code, setCode] = useState(["", "", "", ""]);
    const inputRefs = useRef([]);
    const url = "https://api.kacagider.net";

    useEffect(() => {
        setCode(["", "", "", ""]);
        inputRefs.current[0]?.focus();
    }, [open]);

    const handleVerify = () => {
        const data = {
            email: email,
            username: username,
            password: password,
            code: code.join("")
        }
        try{
            axios.post(url + '/verify', {
                email: data.email,
                username: data.username,
                password: data.password,
                code: data.code,
            }).then(r => {
                handleClose();
            })
            onVerifySuccess(username)
        }
        catch (error) {
            console.error("Error during verification:", error);
        }
    }

    const handleChange = (index, value) => {
        if (/^\d?$/.test(value)) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            // otomatik odak ileriye geç
            if (value && index < 3) {
                inputRefs.current[index + 1]?.focus();
            }

            // eğer tüm kod girildiyse
            if (newCode.every(char => char !== "")) {
                // burada backend'e kodu göndererek doğrulama yapılabilir
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="xs"
                PaperProps={{
                    sx: {
                        backgroundColor: "#1c1c1c",
                        color: "#fff",
                        borderRadius: "12px",
                        padding: 2,
                        width: "100%",
                        border: "2px solid rgb(251, 191, 36)",
                    }
                }}
        >
            <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                Enter Verification Code
                <IconButton onClick={handleClose} sx={{ color: "#fff" }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ mt: 1 }}>
                <Box>
                    <p style={{
                        color: "#fff",
                        fontSize: "20px",
                        margin: "0",
                        padding: "0",
                        textAlign: "center"}}
                    >
                        Please enter the verification code sent to your email.
                    </p>
                </Box>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 2,
                    mt: 1,
                    mb: 2
                }}>

                    {code.map((value, index) => (
                        <TextField
                            key={index}
                            inputRef={(el) => inputRefs.current[index] = el}
                            value={value}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            inputProps={{
                                maxLength: 1,
                                style: {
                                    textAlign: "center",
                                    fontSize: "20px",
                                    backgroundColor: "#fff",
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "6px"
                                }
                            }}
                            variant="outlined"
                        />
                    ))}
                </Box>
            </DialogContent>

            <DialogActions>
                <Button
                    disabled={code.some(c => c === "")}
                    fullWidth
                    variant="contained"
                    onClick={handleVerify}
                    sx={{
                        backgroundColor: "#fbc02d",
                        color: "#000",
                        fontWeight: "bold",
                        borderRadius: "8px",
                        py: 1
                    }}
                >
                    Verify
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default VerifyCodeDialog;
