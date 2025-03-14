import React, {useState} from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    FormControlLabel,
    Switch,
    TextField,
    IconButton,
    Stack,
    Box,
    Checkbox, InputAdornment,
} from '@mui/material';
import {
    DirectionsCar,
    Home,
    LocalShipping,
    TwoWheeler,
    Close, QuestionMark, Repeat, Timer,
} from '@mui/icons-material';
import './PrivateRoom.css';

function PrivateRoom({open, onClose}) {
    const [isPublic, setIsPublic] = useState(false);
    const [categories, setCategories] = useState([
        {name: 'Car', icon: <DirectionsCar/>, selected: false},
        {name: 'House', icon: <Home/>, selected: false},
        {name: 'Tractor', icon: <LocalShipping/>, selected: false},
        {name: 'Motorcycle', icon: <TwoWheeler/>, selected: false},
    ]);
    const [turnCount, setTurnCount] = useState(20);
    const [turnTime, setTurnTime] = useState(57);
    const [guessCount, setGuessCount] = useState(10);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
            className="private-room-dialog"
        >
            <DialogTitle className="private-room-title">
                <span className='private-room-title-paragraph'>CREATE PRIVATE ROOM</span>
                <IconButton
                    onClick={onClose}
                    className="private-room-close-button"
                >
                    <Close/>
                </IconButton>
            </DialogTitle>
            <DialogContent className="private-room-content">
                <FormControlLabel
                    control={<Checkbox checked={isPublic} onChange={() => setIsPublic(!isPublic)}
                                       className="private-room-checkbox"/>}
                    label="Make it public (Other players can see and join your room)"
                    className="private-room-public-label"
                />
                <Stack spacing={2} direction={"row"} className="private-room-categories">
                    {categories.map((category, index) => (
                        <Box key={index} width={{xs: '48%', sm: '32%', md: '23%'}}>
                            <Button
                                variant={category.selected ? 'contained' : 'outlined'}
                                color="primary"
                                startIcon={category.icon}
                                className="private-room-category-button"
                            >
                                {category.name}
                            </Button>
                        </Box>
                    ))}
                </Stack>
                <Stack spacing={2} className="private-room-game-settings">
                    <Stack direction="row" spacing={2}>
                        <TextField
                            label="Rounds"
                            type="number"
                            value={turnCount}
                            onChange={(e) => setTurnCount(parseInt(e.target.value))}
                            fullWidth
                            className="private-room-text-field"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Repeat style={{color: '#fff'}}/>
                                    </InputAdornment>
                                ),
                                style: {color: '#fff'},
                            }}
                            InputLabelProps={{
                                style: {color: '#fff'},
                            }}
                        />
                        <TextField
                            label="Round Time"
                            type="number"
                            value={turnTime}
                            onChange={(e) => setTurnTime(parseInt(e.target.value))}
                            fullWidth
                            className="private-room-text-field"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Timer style={{color: '#fff'}}/>
                                    </InputAdornment>
                                ),
                                style: {color: '#fff'},
                            }}
                            InputLabelProps={{
                                style: {color: '#fff'},
                            }}
                        />
                        <TextField
                            label="Number of Guesses"
                            type="number"
                            value={guessCount}
                            onChange={(e) => setGuessCount(parseInt(e.target.value))}
                            fullWidth
                            className="private-room-text-field"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <QuestionMark style={{color: '#fff'}}/>
                                    </InputAdornment>
                                ),
                                style: {color: '#fff'},
                            }}
                            InputLabelProps={{
                                style: {color: '#fff'},
                            }}
                        />
                    </Stack>
                </Stack>
            </DialogContent>
            <DialogActions className="private-room-actions">
                <Button
                    variant="contained"
                    color="primary"
                    className="private-room-create-button"
                >
                    Create Room
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default PrivateRoom;