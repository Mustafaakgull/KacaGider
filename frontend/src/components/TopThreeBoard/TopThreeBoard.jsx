import React, { useEffect, useState } from "react";
import { Box, Typography, Chip } from "@mui/material";

const TopThreeLeaderboard = ({ realPrice, topThree, secondsLeft = 5 }) => {
    const [countdown, setCountdown] = useState(secondsLeft);

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [secondsLeft]);

    return (
        <Box
            sx={{
                backgroundColor: "#2b2b2b",
                border: "3px solid #fbc02d",
                borderRadius: 2,
                padding: 3,
                width: 600,
                maxWidth: "100%",
                margin: "0 auto",
                textAlign: "center",
            }}
        >
            <Typography variant="h5" fontWeight="bold" color="#fff" gutterBottom>
                Round Results
            </Typography>

            <Typography variant="h6" fontWeight="bold" color="lightgreen" mb={3}>
                Real Price: {realPrice.toLocaleString("tr-TR")} ₺
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

            <Typography sx={{color: "#fff", fontWeight: "bold"}}>
                Please wait for ({countdown}s)
            </Typography>

        </Box>
    );
};

export default TopThreeLeaderboard;
