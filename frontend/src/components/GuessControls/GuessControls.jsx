import React from "react";
import { Box, Button, Stack } from "@mui/material";

function GuessControls({ onChange }) {
    const handleChange = (amount) => {
        onChange?.(amount);
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                mt: 3,
            }}
        >
            <Stack spacing={2}>
                {/* Artı butonlar */}
                <Stack direction="row" spacing={2} justifyContent="center">
                    <Button variant="contained" color="success" onClick={() => handleChange(100000)}>
                        + 100.000 ₺
                    </Button>
                    <Button variant="contained" color="success" onClick={() => handleChange(25000)}>
                        + 25.000 ₺
                    </Button>
                    <Button variant="contained" color="success" onClick={() => handleChange(5000)}>
                        + 5.000 ₺
                    </Button>
                </Stack>

                {/* Eksi butonlar */}
                <Stack direction="row" spacing={2} justifyContent="center">
                    <Button variant="contained" color="error" onClick={() => handleChange(-100000)}>
                        − 100.000 ₺
                    </Button>
                    <Button variant="contained" color="error" onClick={() => handleChange(-25000)}>
                        − 25.000 ₺
                    </Button>
                    <Button variant="contained" color="error" onClick={() => handleChange(-5000)}>
                        − 5.000 ₺
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
}

export default GuessControls;
