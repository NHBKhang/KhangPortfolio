import { motion } from "framer-motion";
import styles from "../../styles/ReactionBox.module.css";
import { useState } from "react";

const reactions = [
    { id: "1", icon: "👍", label: "Like" },
    { id: "2", icon: "❤️", label: "Love" },
    { id: "3", icon: "😂", label: "Haha" },
    { id: "4", icon: "😲", label: "Wow" },
    { id: "5", icon: "😢", label: "Sad" }
];

const ReactionBox = ({ onReact, react, blockedReactions = [] }) => {
    const [selectedReaction, setSelectedReaction] = useState(null);

    const handleReaction = async (id) => {
        let isSelected = id === selectedReaction ? null : id
        setSelectedReaction(isSelected);
        if (isSelected)
            await onReact(id);
    };

    const filteredReactions = reactions.filter(
        (reaction) => !blockedReactions?.includes(reaction.id)
    );

    return (
        <div className={styles.action}>
            {filteredReactions.map((reaction) => (
                <div className={styles.react}>
                    <button
                        title={reaction.label}
                        key={reaction.id}
                        className={`${styles.reactionBtn} ${selectedReaction === reaction.id ? styles.selected : ""}`}
                        onClick={() => handleReaction(reaction.id)}
                    >
                        <motion.div
                            whileHover={{ scale: 1.25, rotate: 7 }}
                            whileTap={{ scale: 0.9 }}>
                            {reaction.icon}
                        </motion.div>
                    </button>
                    <p>{react[reaction.id]}</p>
                </div>
            ))}
        </div>
    );
}

export default ReactionBox;