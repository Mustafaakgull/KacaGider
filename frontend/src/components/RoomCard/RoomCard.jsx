import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import GroupsIcon from '@mui/icons-material/Groups';

export default function RoomCard({ room }) {
    return (
        <Card
            sx={{
                backgroundColor: "#1e1e1e",
                color: "white",
                borderRadius: 2,
                border: "1px solid #555",
                minHeight: 250,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                p: 2
            }}
        >
            {/* ÜST KISIM */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography fontWeight="bold">ROOM NAME</Typography>
                <Box display="flex" alignItems="center" gap={0.5}>
                    <DirectionsCarIcon sx={{ fontSize: 20, color: "#FFD700" }} />
                    <Typography variant="caption" fontWeight="bold" color="#FFD700">CAR</Typography>
                </Box>
            </Box>

            {/* AÇIKLAMA */}
            <Typography variant="body2" sx={{ my: 1 }} color="gray">
                Room Description
            </Typography>

            {/* ORTA KISIM */}
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                px={1}
                py={0.5}
                sx={{ backgroundColor: "#333", borderRadius: 1 }}
            >
                <Typography fontWeight="bold" color="#FFD700">
                    {room.owner}
                </Typography>
                <Box display="flex" alignItems="center" gap={0.5}>
                    <GroupsIcon sx={{ fontSize: 18, color: "white" }} />
                    <Typography fontSize={12}>{room.players}/10</Typography>
                </Box>
            </Box>

            {/* BUTON */}
            <Button
                variant="contained"
                fullWidth
                sx={{
                    mt: 2,
                    backgroundColor: "#FFC107",
                    color: "#000",
                    fontWeight: "bold",
                    borderRadius: 1,
                    '&:hover': {
                        backgroundColor: "#ffb300"
                    }
                }}
            >
                JOIN ROOM
            </Button>
        </Card>
    );
}
