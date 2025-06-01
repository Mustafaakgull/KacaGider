import React, {useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import ProductCard from "../../components/ProductTable/ProductTable.jsx";
import GuessControls from "../../components/GuessControls/GuessControls.jsx";
import GuessCounter from "../../components/GuessCounter/GuessCounter.jsx";
// import io from "socket.io-client";
import { SocketContext } from '../../SocketioConnection.jsx';

// socket bağlantısı
// const socket = io("http://localhost:5000", {
//     withCredentials: true,
//     transports: ["websocket"],
// });
function RoomPage() {

    const socket = useContext(SocketContext);
    const { category } = useParams();
    const [guessCount, setGuessCount] = useState(0);
    const [listing, setListing] = useState(null);

    // useEffect(() => {
    //     if (!socket) return;
    //     if (!socket.connected) {
    //         socket.on("connect", () => {
    //             socket.emit("take_vehicle_data", "otomobil");
    //         });
    //         console.log("ROOM PAGE !CONNECTED")
    //     } else {
    //         // socket.emit("take_vehicle_data", category);
    //         socket.emit("take_vehicle_data", "otomobil")
    //     }
    //
    //     socket.on("vehicle_data:", (data) => {
    //         console.log("Gelen veri:", data); // kontrol için
    //         setListing(data);
    //     });
    //
    //     return () => {
    //         socket.off("vehicle_data:");
    //         socket.off("connect");
    //     };
    // }, [category]);
    useEffect(() => {
    // 🔹 Emit request for data
    socket.emit("take_vehicle_data", "otomobil"); // or "bus", etc.

    // 🔹 Listen for the server's response
    socket.on("vehicle_data:", (data) => {
      console.log("Received vehicle data:", data.data);
      console.log("photos", data.photos)
      console.log("photo1", data.photos["1"]) // fotolara erismek icin böyle
      setListing(data.data)
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
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                minHeight: "100vh",
                backgroundColor: "#111",
                color: "#fff",
                padding: 3,
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

                    <GuessCounter count={guessCount} />
                    <GuessControls socket={socket} />
                </>
            )}
        </Box>
    );
}

export default RoomPage;
