import React, { useState } from "react";
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, Snackbar, Alert, Box
} from "@mui/material";

function ContactDialog({ open, handleClose }) {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            // backend entegrasyonunu burada yap
            const response = await fetch("http://127.0.0.1:5000/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Mesaj gönderilemedi");
            setSnackbarOpen(true);
            setFormData({ name: "", email: "", message: "" });
            handleClose();
        } catch (err) {
            setError("Mesaj gönderilemedi. Lütfen tekrar deneyin.");
        }
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth margin="normal"
                    PaperProps={{
                        sx: {
                            backgroundColor: "#1e1e1e",
                            border: "2px solid #fbc02d",
                            borderRadius: "12px",
                            color: "#fff",
                            p: 2,
                            marginTop: 10,
                        }
                    }}
            >
                <DialogTitle sx={{ color: "#fff", fontWeight: "bold", fontSize: "1.5rem" }}>
                    Contact Us
                </DialogTitle>

                <DialogContent>
                    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                        <TextField
                            name="name"
                            label="Adınız"
                            variant="outlined"
                            fullWidth
                            required
                            value={formData.name}
                            onChange={handleChange}
                            sx={{
                                input: { color: "#fff" },
                                label: { color: "#fbc02d" },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": { borderColor: "#fbc02d" },
                                    "&:hover fieldset": { borderColor: "#fbc02d" },
                                    "&.Mui-focused fieldset": { borderColor: "#fbc02d" },
                                },
                            }}
                        />
                        <TextField
                            name="email"
                            label="E-posta"
                            type="email"
                            variant="outlined"
                            fullWidth
                            required
                            value={formData.email}
                            onChange={handleChange}
                            sx={{
                                input: { color: "#fff" },
                                label: { color: "#fbc02d" },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": { borderColor: "#fbc02d" },
                                    "&:hover fieldset": { borderColor: "#fbc02d" },
                                    "&.Mui-focused fieldset": { borderColor: "#fbc02d" },
                                },
                            }}
                        />
                        <TextField
                            name="message"
                            label="Mesajınız"
                            variant="outlined"
                            fullWidth
                            required
                            multiline
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                            sx={{
                                input: { color: "#fff" },
                                label: { color: "#fbc02d" },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": { borderColor: "#fbc02d" },
                                    "&:hover fieldset": { borderColor: "#fbc02d" },
                                    "&.Mui-focused fieldset": { borderColor: "#fbc02d" },
                                },
                            }}
                        />
                        {error && <Box sx={{ color: "red" }}>{error}</Box>}
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        sx={{
                            backgroundColor: "#fbc02d",
                            color: "#fff",
                            fontWeight: "bold",
                            px: 4,
                            py: 1,
                            borderRadius: "8px",
                            mx: 2,
                        }}
                        fullWidth
                    >
                        Send
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={snackbarOpen} autoHideDuration={5000} onClose={() => setSnackbarOpen(false)}>
                <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: "100%" }}>
                    Mesajınız başarıyla gönderildi!
                </Alert>
            </Snackbar>
        </>
    );
}

export default ContactDialog;
