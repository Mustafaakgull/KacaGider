import React, {useEffect, useState} from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    TextField,
    Button,
    Typography,
    Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

function EditProfileDialog({ open, onClose, email, onUpdateSuccess }) {
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleUsernameChange = async () => {
        if (!newUsername) return;
        try {
            await axios.post('https://api.kacagider.net/reset_username', {
                email,
                new_username: newUsername,
            }, { withCredentials: true });
            onUpdateSuccess?.(newUsername);
            setNewUsername('');
        } catch (e) {
            console.error(e);
        }
    };

    const handlePasswordChange = async () => {
        if (!newPassword) return;
        try {
            await axios.post('https://api.kacagider.net/reset_password', {
                email,
                new_password: newPassword,
            }, { withCredentials: true });
            setNewPassword('');
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        if (!open) {
            setNewUsername('');
            setNewPassword('');
        }
    }, [open]);

    return (
        <Dialog open={open} onClose={onClose} PaperProps={{ sx: { backgroundColor: '#1e1e1e', borderRadius: 3 } }}>
            <Box sx={{ position: 'relative', p: 3 }}>
                <IconButton
                    onClick={onClose}
                    sx={{ position: 'absolute', right: 8, top: 8, color: '#fff' }}
                >
                    <CloseIcon />
                </IconButton>

                <DialogTitle sx={{ color: 'white', fontWeight: 'bold', px: 0 }}>Edit Profile</DialogTitle>

                <DialogContent sx={{ px: 0 }}>
                    <Typography variant="subtitle1" sx={{ color: 'white', mt: 2 }}>
                        Edit Username
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="New Username"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        InputProps={{
                            sx: {
                                backgroundColor: '#2a2a2a',
                                color: 'white',
                                borderRadius: 1,
                                '& fieldset': {
                                    borderColor: '#FFC107',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#FFC107',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#FFC107',
                                },
                            },
                        }}
                        sx={{ mt: 1, mb: 2 }}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleUsernameChange}
                        sx={{
                            backgroundColor: '#FFC107',
                            color: 'black',
                            fontWeight: 'bold',
                            mb: 3,
                            '&:hover': { backgroundColor: '#e6b100' }
                        }}
                    >
                        Edit Username
                    </Button>

                    <Typography variant="subtitle1" sx={{ color: 'white' }}>
                        Edit Password
                    </Typography>
                    <TextField
                        fullWidth
                        type="password"
                        variant="outlined"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        InputProps={{
                            sx: {
                                backgroundColor: '#2a2a2a',
                                color: 'white',
                                borderRadius: 1,
                                '& fieldset': {
                                    borderColor: '#FFC107',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#FFC107',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#FFC107',
                                },
                            },
                        }}
                        sx={{ mt: 1, mb: 2 }}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handlePasswordChange}
                        sx={{
                            backgroundColor: '#FFC107',
                            color: 'black',
                            fontWeight: 'bold',
                            '&:hover': { backgroundColor: '#e6b100' }
                        }}
                    >
                        Edit Password
                    </Button>
                </DialogContent>
            </Box>
        </Dialog>
    );
}

export default EditProfileDialog;
