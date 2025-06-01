import React, {useContext, useEffect, useState } from "react";
import { Box } from "@mui/material";
import ProductCard from "../../components/ProductTable/ProductTable.jsx";
import GuessControls from "../../components/GuessControls/GuessControls.jsx";
import GuessCounter from "../../components/GuessCounter/GuessCounter.jsx";
// import io from "socket.io-client";
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
    // 🔹 Emit request for data
    socket.emit("take_vehicle_data", "otomobil"); // or "bus", etc.
    socket.emit("take_leaderboard_data")
    socket.on("leaderboard_data", data => {
        if (data.leaderboard == null) {
            setLeaderboard(null)
        }
        setLeaderboard(data);
    })

    // 🔹 Listen for the server's response
    socket.on("vehicle_data:", (data) => {
        console.log("imöei siktim", data);
      console.log("Received vehicle data:", data.data);
      console.log("photos", data.photos)
      console.log("photo1", data.photos["1"]) // fotolara erismek icin böyle
      setListing(data)
      // You can update state here if needed
    });

    // 🔹 Clean up the listener
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
                <Stack
                    direction="row"
                    sx={{ width: "100%", mt: 4 }}
                    justifyContent="space-between"
                    alignItems="flex-start"
                >
                    {/* 2 kolon boşluk */}
                    <Box sx={{ flexBasis: "16.66%" }} />

                    {/* 4 kolonluk ProductCard */}
                    <Box sx={{ flexBasis: "33.33%", maxWidth: "33.33%" }}>
                        <ProductCard
                            listing={listing}
                            guessCount={guessCount}
                            setGuessCount={setGuessCount}
                        />
                    </Box>

                    {/* 1 kolon boşluk */}
                    <Box sx={{ flexBasis: "8.33%" }} />

                    {/* 3 kolonluk LeaderBoard */}
                    <Box sx={{ flexBasis: "25%", maxWidth: "25%" }}>
                        <LeaderBoard leaderboard={leaderboard} />
                    </Box>

                    {/* 2 kolon boşluk */}
                    <Box sx={{ flexBasis: "16.66%" }} />
                </Stack>
            )}
            <Chatbox />

        </Box>
    );
}

export default RoomPage;
