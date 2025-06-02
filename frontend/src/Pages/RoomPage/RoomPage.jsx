import React, { useContext, useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import ProductCard from "../../components/ProductTable/ProductTable.jsx";
import GuessControls from "../../components/GuessControls/GuessControls.jsx";
import GuessCounter from "../../components/GuessCounter/GuessCounter.jsx";
import { SocketContext } from '../../SocketioConnection.jsx';
import LeaderBoard from "../../components/LiveLeaderboard/LiveLeaderboard.jsx";
import Chatbox from "../../components/Chatbox/Chatbox.jsx";
import Stack from "@mui/material/Stack";

function RoomPage() {
    const socket = useContext(SocketContext);
    const [guessCount, setGuessCount] = useState(0);
    const [listing, setListing] = useState(null);
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        socket.emit("take_vehicle_data", "otomobil");
        socket.emit("take_leaderboard_data");

        socket.on("leaderboard_data", data => {
            setLeaderboard(data?.leaderboard ?? null);
        });

        socket.on("vehicle_data:", data => {
            console.log("Vehicle data:", data);
            setListing(data);
        });

        return () => {
            socket.off("vehicle_data:");
        };
    }, [socket]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "center",
                minHeight: "100vh",
                backgroundColor: "#111",
                color: "#fff",
                padding: 3,
                gap: 4,
                overflowY: "auto",
            }}
        >
            {listing && (
                <Grid container spacing={2} sx={{ mt: 2, width: "100%" }} justifyContent="center">
                    {/* ProductCard - daha geniş alan */}
                    <Grid item xs={12} md={6}>
                        <ProductCard
                            listing={listing}
                            guessCount={guessCount}
                            setGuessCount={setGuessCount}
                        />
                    </Grid>

                    {/* Leaderboard */}
                    <Grid item xs={12} md={3}>
                        <LeaderBoard leaderboard={leaderboard} />
                    </Grid>
                </Grid>
            )}
            <Chatbox />
        </Box>
    );
}

export default RoomPage;
