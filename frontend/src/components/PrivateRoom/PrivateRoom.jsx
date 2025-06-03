import React, { useEffect, useState } from "react";
import {
    Dialog, DialogTitle, DialogContent,
    TextField, Button, Grid, Typography, Box, Card, CardContent
} from "@mui/material";
import { DriveEta, TwoWheeler } from "@mui/icons-material";

const categories = [
    { key: "car", label: "CAR", icon: <DriveEta sx={{ fontSize: 46 }} /> },
    { key: "motorcycle", label: "MOTORCYCLE", icon: <TwoWheeler sx={{ fontSize: 46 }} /> },
];

export default function PrivateRoom({ open, onClose, onCreate }) {
    const [roomName, setRoomName] = useState("");
    const [password, setPassword] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const handleCreate = () => {
        if (!roomName || !selectedCategory) return;
        onCreate({ roomName, password, category: selectedCategory });
        setRoomName("");
        setPassword("");
        setSelectedCategory("");
    };

    useEffect(() => {
        if (!open) {
            setRoomName("");
            setSelectedCategory("");
            setPassword("");
        }
    }, [open]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{ style: { backgroundColor: "#1e1e1e", color: "#f0f0f0" } }}
        >
            <DialogTitle sx={{ textAlign: "center", color: "#ffffff" }}>
                CREATE PRIVATE ROOM
            </DialogTitle>
            <DialogContent disablePadding>
                <Box sx={{ px: 3, pt: 2 }}>
                    <TextField
                        fullWidth
                        label="Room Name"
                        variant="filled"
                        value={roomName}
                        onChange={e => setRoomName(e.target.value)}
                        sx={{
                            mb: 2,
                            input: { color: "#fff" },
                            label: { color: "#bbb" },
                            backgroundColor: "#2c2c2c",
                            borderRadius: 1
                        }}
                    />
                    <Typography variant="subtitle1" sx={{ color: "#bbb", mb: 1 }}>
                        Select Category
                    </Typography>
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                        {categories.map(cat => (
                            <Grid item xs={6} key={cat.key}>
                                <Card
                                    onClick={() => setSelectedCategory(cat.key)}
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                        cursor: "pointer",
                                        backgroundColor: selectedCategory === cat.key ? "#ffc107" : "#2c2c2c",
                                        color: selectedCategory === cat.key ? "#000" : "#fff",
                                        border: selectedCategory === cat.key ? "2px solid #ffc107" : "1px solid #444",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        boxSizing: "border-box",
                                    }}
                                >
                                    <CardContent
                                        sx={{
                                            width: "100%",
                                            padding: "8px !important",
                                            boxSizing: "border-box",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Box
                                            display="flex"
                                            flexDirection="column"
                                            alignItems="center"
                                            justifyContent="center"
                                            width="100%"
                                            textAlign="center"
                                        >
                                            {cat.icon}
                                            <Typography variant="caption" noWrap>
                                                {cat.label}
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </Card>


                            </Grid>
                        ))}
                    </Grid>
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="filled"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        sx={{
                            input: { color: "#fff" },
                            label: { color: "#bbb" },
                            backgroundColor: "#2c2c2c",
                            borderRadius: 1,
                            mb: 3
                        }}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleCreate}
                        sx={{
                            backgroundColor: "#ffc107",
                            color: "#fff",
                            height: 40,
                        }}
                    >
                        CREATE ROOM
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
}
