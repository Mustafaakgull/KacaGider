import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../SocketioConnection.jsx';
import {
    Box,
    Typography,
    IconButton,
    TextField,
    Button,
    Divider,
    Paper
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SendIcon from '@mui/icons-material/Send';

function ChatRoom() {
    const [message, setMessage] = useState('');
    const [chatLog, setChatLog] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const socket = useContext(SocketContext);

    useEffect(() => {
        socket.on('receive_message', (data) => {
            setChatLog((prev) => [...prev, data]);
        });

        return () => {
            socket.off('receive_message');
        };
    }, [socket]);

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit('send_message', { message });
            setMessage('');
        }
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 0,
                right: 0,
                width: isOpen ? 450 : 450,
                height: isOpen ? 750 : 54,
                borderRadius: 2,
                bgcolor: '#111',
                color: '#fff',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 4,
                zIndex: 1300,
                transition: 'all 0.3s ease-in-out',
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    px: 2,
                    py: 1,
                    cursor: 'pointer',
                    bgcolor: '#1e1e1e',
                }}
                onClick={() => setIsOpen(!isOpen)}
            >
                <Typography sx={{ color: '#fff' }}>Chat</Typography>
                <IconButton size="small" sx={{ color: '#f1c40f' }}>
                    {isOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
                </IconButton>
            </Box>

            {isOpen && (
                <>
                    <Divider sx={{ bgcolor: '#333' }} />

                    {/* Chat Messages */}
                    <Box
                        sx={{
                            flex: 1,
                            p: 2,
                            overflowY: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                            bgcolor: '#1a1a1a',
                        }}
                    >
                        {chatLog.map((msg, idx) => (
                            <Paper
                                key={idx}
                                sx={{
                                    backgroundColor: '#333',
                                    color: '#fff',
                                    px: 2,
                                    py: 1,
                                    fontSize: '0.875rem',
                                    borderRadius: 2,
                                }}
                            >
                                <strong style={{ color: '#f1c40f' }}>{msg.username}</strong>: {msg.message}
                            </Paper>
                        ))}
                    </Box>

                    {/* Input + Send */}
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 1,
                            p: 2,
                            bgcolor: '#111',
                            borderTop: '1px solid #333',
                        }}
                    >
                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            placeholder="write message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                            InputProps={{
                                sx: {
                                    bgcolor: '#222',
                                    color: '#fff',
                                    borderRadius: '20px',
                                    '& input': { color: '#fff' },
                                },
                            }}
                        />
                        <Button
                            variant="contained"
                            onClick={sendMessage}
                            sx={{
                                minWidth: 40,
                                bgcolor: '#f1c40f',
                                color: '#000',
                                borderRadius: '50%',
                                padding: '8px',
                                '&:hover': {
                                    bgcolor: '#e1b700',
                                },
                            }}
                        >
                            <SendIcon fontSize="small" />
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    );
}

export default ChatRoom;
