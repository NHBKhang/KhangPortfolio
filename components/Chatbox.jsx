import { useEffect, useRef, useState } from 'react';
import styles from '../styles/Chatbox.module.css';

const Chatbox = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const messagesRef = useRef();

    const sendMessage = async () => {
        if (message.trim() === '') return;

        setLoading(true);
        setMessages((prev) => [...prev, { sender: 'user', text: message }]);
        setMessage('');

        try {
            const sessionId = `session-${Date.now()}`;

            const res = await fetch('/api/dialogflow', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message, sessionId: sessionId }),
            });

            const data = await res.json();
            const botMessage = { sender: 'bot', text: data.response };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    const toggleChatbox = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div>
            <button
                onClick={toggleChatbox}
                className={styles.toggleButton}
                aria-label={isOpen ? 'Đóng chat' : 'Mở chat'}>
                <img
                    className={`${styles.icon} ${isOpen ? styles.hidden : styles.visible}`}
                    src='./close.png' alt='close' width={30} height={30} />
                <img
                    className={`${styles.icon} ${isOpen ? styles.visible : styles.hidden}`}
                    src='./coco.png' alt='open' width={38} height={38} />
            </button>

            <div className={`${styles.chatbox} ${isOpen ? styles.open : ''}`}>
                <div className={styles.chatHeader}>
                    <h2 className={styles.chatTitle}>Coco Chat</h2>
                </div>
                <div className={styles.messages} ref={messagesRef}>
                    {messages.map((m, index) => (
                        <div
                            key={index}
                            className={m.sender === 'user' ? styles.userMessage : styles.botMessage}
                        >
                            {m.text}
                        </div>
                    ))}
                    {loading &&
                        <div className={`${styles.botMessage} ${styles.loading}`}>
                            Đang soạn tin nhắn...
                        </div>
                    }
                </div>
                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Nhập tin nhắn của bạn..."
                        className={styles.chatInput}
                    />
                    <button onClick={sendMessage} className={styles.sendButton}>Gửi</button>
                </div>
            </div>
        </div>
    );
};

export default Chatbox;