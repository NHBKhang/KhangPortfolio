import { useEffect, useRef, useState } from 'react';
import styles from '../../styles/components/Chatbox.module.css';
import { useTranslation } from 'next-i18next';
import { useNotification } from '../../utils/toast';
import { useLanguage } from '../../configs/LanguageContext';
import axios from 'axios';

const defaultMessage = [
    { sender: 'bot', text: { vi: "Xin chào!", en: "Hello there!" } },
    { sender: 'bot', text: { 
        vi: "Tên tôi là Coco Chat, tôi là bot hỗ trợ của Khang Portfolio 🤖", 
        en: "My name is Coco Chat, I'm Khang Portfolio's support bot 🤖" 
    } },
    { sender: 'bot', text: { 
        vi: "Tôi có giúp gì cho bạn?", 
        en: "How can I help you?" 
    } },
];

const Chatbox = () => {
    const { language } = useLanguage();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const messagesRef = useRef();
    const { t } = useTranslation('common');
    const sendNotification = useNotification();

    const sendMessage = async () => {
        if (message.trim() === '') return;

        setLoading(true);
        setMessages((prev) => [...prev, { sender: 'user', text: message }]);
        setMessage('');

        try {
            const sessionId = `session-${Date.now()}`;

            const res = await axios.post('/api/dialogflow', {
                message: message,
                sessionId: sessionId,
            });

            const data = res.data;
            const botMessage = { sender: 'bot', text: data.response };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            sendNotification({ message: t('botError') }, 'error');
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

    useEffect(() => {
        const handleScroll = () => {
            if (isOpen) {
                setIsOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [isOpen]);

    useEffect(() => {
        const localizedMessages = defaultMessage.map(msg => ({
            sender: msg.sender,
            text: msg.text[language] || msg.text.en
        }));
        setMessages(localizedMessages);
    }, [language]);

    return (
        <div>
            <button
                onClick={toggleChatbox}
                className={styles.toggleButton}
                aria-label={isOpen ? 'Đóng chat' : 'Mở chat'}>
                <img
                    className={`${styles.icon} ${isOpen ? styles.visible : styles.hidden} ${styles.closeIcon}`}
                    src='/img/logo/close.png' alt='close' width={30} height={30} />
                <img
                    className={`${styles.icon} ${isOpen ? styles.hidden : styles.visible}`}
                    src='/img/logo/coco.png' alt='open' width={37} height={37} />
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
                            {t('botComposing')}
                        </div>
                    }
                </div>
                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={t('botPlaceholder')}
                        className={styles.chatInput}
                    />
                    <button onClick={sendMessage} className={styles.sendButton}>
                        {t('sendButton')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chatbox;