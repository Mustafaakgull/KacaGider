import { Box, Typography, Button } from '@mui/material';
import RoomCard from '../../components/RoomCard/RoomCard';

const dummyRooms = [
    { id: 1, owner: 'JOHN DOE', players: 1 },
    { id: 2, owner: 'JOE DOE', players: 4 },
    { id: 3, owner: 'JANE DOE', players: 7 },
    { id: 4, owner: 'ALI KAYA', players: 2 },
    { id: 5, owner: 'ZEYNEP GÜL', players: 9 },
];

export default function UserRoomsPage() {
    return (
        <Box sx={{ padding: 4, minHeight: '100vh', backgroundColor: '#121212' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Typography variant="h5" color="white" fontWeight="bold">
                    USER ROOMS
                </Typography>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#FFC107",
                        color: "#000",
                        fontWeight: "bold",
                        borderRadius: 1,
                        '&:hover': { backgroundColor: "#ffb300" }
                    }}
                >
                    CREATE ROOM
                </Button>
            </Box>

            {/* Responsive Card Container */}
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 3,
                }}
            >
                {dummyRooms.map(room => (
                    <Box
                        key={room.id}
                        sx={{
                            flex: "0 0 calc(25% - 24px)",
                            minWidth: "280px",             // minimum width for small screens
                        }}
                    >
                        <RoomCard room={room} />
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
