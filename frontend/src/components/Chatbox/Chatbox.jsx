import React, {useContext, useEffect, useState} from 'react';
import { SocketContext } from '../../SocketioConnection.jsx';


function ChatRoom() {
    const [message, setMessage] = useState('');
    const [chatLog, setChatLog] = useState([]);
    const socket = useContext(SocketContext);


    useEffect(() => {
        socket.on('receive_message', (data) => {
            console.log("mesaj datası", data);
            setChatLog((prev) => [...prev, data]);
        });


        return () => {
            socket.off('receive_message');
        };
    });

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit('send_message', { message });
            setMessage('');
        }
    };



    return (
        <div className="p-4">
            <div className="border p-4 mb-4 h-64 overflow-y-auto bg-gray-100 rounded">
                {chatLog.map((msg, idx) => (
                    <div key={idx} className="mb-1">
                        <strong>{msg.username}:</strong> {msg.message}
                    </div>
                ))}
            </div>

            <div className="flex gap-2">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1 border rounded p-2"
                    placeholder="Type a message..."
                />
                <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Send
                </button>
            </div>
        </div>
    );
}

export default ChatRoom;