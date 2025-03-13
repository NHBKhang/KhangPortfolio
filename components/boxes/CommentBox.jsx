import { useState } from "react";
import styles from "../../styles/CommentBox.module.css";
import moment from "moment";
import { useTranslation } from "next-i18next";
import { useNotification } from "../../utils/toast";
import { useLanguage } from "../../configs/LanguageContext";

const CommentBox = ({ comments, onAddComment }) => {
    const { t } = useTranslation('common');
    const { language } = useLanguage();
    const sendNotification = useNotification();
    const [comment, setComment] = useState("");

    const handleAddComment = async () => {
        if (!comment.trim()) {
            sendNotification({
                message: t('emptyComment'),
                title: "Oops",
                icon: "🙊"
            })
            return;
        }

        await onAddComment?.(comment);
        setComment("");
    };

    return (
        <div className={styles.container}>
            <div className={styles.inputArea}>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder={t('commentPlaceholder')}
                />
                <button onClick={handleAddComment}>{t('post')}</button>
            </div>
            <ul className={styles.commentList}>
                {comments.map((c, index) => (
                    <li key={index}>
                        <img className={styles.avatar} src={c.user.avatar} />
                        <div>
                            <div className={styles.content}>
                                <strong>{c.user.name[language] || c.user.name}</strong>
                                <p>{c.content}</p>
                            </div>
                            <p>{moment(c.timestamp).fromNow()}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CommentBox;
