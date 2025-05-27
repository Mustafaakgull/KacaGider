import React, {useState} from "react";
import {Box, Container, Typography, Link, Button} from "@mui/material";
import ContactDialog from "../Contact/Contact.jsx"; // yolunu ayarla


function Footer() {
    const [contactDialogOpen, setContactDialogOpen] = useState(false);

    return (
        <>
        <Box
            component="footer"
            sx={{
                backgroundColor: "rgb(40,40,40)",
                color: "white",
                py: 2,
                px: 2,
                mt: "auto",
                borderTop: "1px solid #333",
            }}
        >
            <Container maxWidth="xl" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="body2" sx={{ fontSize: "0.9rem" }}>
                    © 2025 Kacagider. All rights are reserved.
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                </Box>
            </Container>
        </Box>
        <ContactDialog open={contactDialogOpen} handleClose={() => setContactDialogOpen(false)} />

        </>

    );
}

export default Footer;
