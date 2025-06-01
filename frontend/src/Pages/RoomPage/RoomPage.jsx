import React, {useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import ProductCard from "../../components/ProductTable/ProductTable.jsx";
import GuessControls from "../../components/GuessControls/GuessControls.jsx";
import GuessCounter from "../../components/GuessCounter/GuessCounter.jsx";
// import io from "socket.io-client";
import { SocketContext } from '../../SocketioConnection.jsx';
import LeaderBoard from "../../components/LiveLeaderboard/LiveLeaderboard.jsx";
import Chatbox from "../../components/Chatbox/Chatbox.jsx";

// socket bağlantısı
// const socket = io("http://localhost:5000", {
//     withCredentials: true,
//     transports: ["websocket"],
// });
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
                flexDirection: "row", // 👈 değiştirildi
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
                <>
                    <ProductCard
                        listing={listing}
                        guessCount={guessCount}
                        setGuessCount={setGuessCount}
                    />

                    <LeaderBoard leaderboard={leaderboard} />
                    <Chatbox />

                </>

            )}
        </Box>
    );
}

export default RoomPage;
