import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import ProductCard from "../../components/ProductTable/ProductTable.jsx";
import GuessControls from "../../components/GuessControls/GuessControls.jsx";
import GuessCounter from "../../components/GuessCounter/GuessCounter.jsx";
import io from "socket.io-client";

// socket bağlantısı
const socket = io("http://localhost:5000", {
    withCredentials: true,
    transports: ["websocket"],
});

function RoomPage() {
    const { category } = useParams();
    const [guessCount, setGuessCount] = useState(0);
    const [listing, setListing] = useState(null);

    useEffect(() => {
        if (!socket) return;
        if (!socket.connected) {
            socket.on("connect", () => {
                socket.emit("take_vehicle_data", category);
            });
        } else {
            socket.emit("take_vehicle_data", category);
        }

        socket.on("vehicle_data:", (data) => {
            console.log("Gelen veri:", data); // kontrol için
            setListing(data);
        });

        return () => {
            socket.off("vehicle_data:");
            socket.off("connect");
        };
    }, [category]);

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
                        socket={socket}
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
