import React from "react";
import { Box, Button } from "@mui/material";

function GuessControls({ onChange }) {
    const handleChange = (amount) => {
        onChange?.(amount);
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                gap: 1,
                flexWrap: "wrap",
                mt: 3,
            }}
        >
            {/* Pozitif Butonlar */}
            <Button variant="contained" color="success" onClick={() => handleChange(100000)}>
                + 100.000 ₺
            </Button>
            <Button variant="contained" color="success" onClick={() => handleChange(25000)}>
                + 25.000 ₺
            </Button>
            <Button variant="contained" color="success" onClick={() => handleChange(5000)}>
                + 5.000 ₺
            </Button>

            {/* Negatif Butonlar */}
            <Button variant="contained" color="error" onClick={() => handleChange(-100000)}>
                − 100.000 ₺
            </Button>
            <Button variant="contained" color="error" onClick={() => handleChange(-25000)}>
                − 25.000 ₺
            </Button>
            <Button variant="contained" color="error" onClick={() => handleChange(-5000)}>
                − 5.000 ₺
            </Button>
        </Box>
    );
}

export default GuessControls;
