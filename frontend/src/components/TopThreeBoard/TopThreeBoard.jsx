import React from "react";
import { Box, Typography, Chip } from "@mui/material";

const TopThreeLeaderboard = ({ realPrice, topThree, secondsLeft }) => {
    return (
        <Box
            sx={{
                backgroundColor: "#2b2b2b",
                border: "3px solid #fbc02d",
                borderRadius: 2,
                padding: 3,
                width: "100%",
                maxWidth: 600,
                margin: "0 auto",
                textAlign: "center",
            }}
        >
            <Typography variant="h5" fontWeight="bold" color="#fff" gutterBottom>
                Tur Sonuçları
            </Typography>

            <Typography variant="h6" fontWeight="bold" color="lightgreen" mb={3}>
                Gerçek Fiyat: {realPrice.toLocaleString("tr-TR")} ₺
            </Typography>

            {topThree.map((user, index) => (
                <Box
                    key={user.username}
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: index === 0 ? "#6c2e00" : index === 1 ? "#444" : "#6c2e00",
                        color: "#fff",
                        border: index === 1 ? "2px solid #aaa" : "2px solid #fbc02d",
                        borderRadius: 2,
                        px: 2,
                        py: 1.5,
                        mb: 2,
                    }}
                >
                    <Typography fontWeight="bold">{user.username}</Typography>
                    <Typography>{user.guess.toLocaleString("tr-TR")} ₺</Typography>
                    <Chip
                        label={`%${user.percentage}`}
                        sx={{ backgroundColor: "#006400", color: "#fff", fontWeight: "bold" }}
                    />
                    <Typography color="lightgreen" fontWeight="bold">
                        +{user.score}
                    </Typography>
                </Box>
            ))}

            <Box
                sx={{
                    backgroundColor: "#fbc02d",
                    color: "#000",
                    fontWeight: "bold",
                    py: 1.5,
                    borderRadius: 1,
                    fontSize: "1rem",
                    mt: 4,
                }}
            >
                Lütfen Bekleyiniz ({secondsLeft}s)
            </Box>
        </Box>
    );
};

export default TopThreeLeaderboard;
