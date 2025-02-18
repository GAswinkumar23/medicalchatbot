import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { IconButton, TextField, Box } from '@mui/material';

const InputBox = ({ sendMessage }) => {
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim()) {
            sendMessage(input);
            setInput('');
        }
    };

    return (
        <Box className="input-box">
            <TextField
                fullWidth
                variant="outlined"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <IconButton onClick={handleSend} className="send-button">
                <SendIcon />
            </IconButton>
        </Box>
    );
};

export default InputBox;