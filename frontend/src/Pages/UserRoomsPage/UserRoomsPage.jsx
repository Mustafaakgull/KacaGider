import { Box, Typography, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
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

            <Grid container spacing={3}>
                {dummyRooms.map(room => (
                    <Grid xs={12} sm={6} md={4} lg={3} key={room.id}> {/* ✅ Responsive Grid v2 */}
                        <RoomCard room={room} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
