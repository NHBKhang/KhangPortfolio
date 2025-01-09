import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { variants } from "../utils/animationVariants";
import styles from "../styles/SharedModal.module.css";

const SharedModal = ({
    index,
    images,
    changePhotoId,
    closeModal,
    navigation,
    direction
}) => {
    const [loaded, setLoaded] = useState(false);

    const handlers = useSwipeable({
        onSwipedLeft: () => {
            if (index < images.length - 1) changePhotoId(index + 1);
        },
        onSwipedRight: () => {
            if (index > 0) changePhotoId(index - 1);
        },
        trackMouse: true,
    });

    const currentImage = images[index];

    return (
        <MotionConfig transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
        }}>
            <div className={styles.container} {...handlers}>
                <div className={styles.imageWrapper}>
                    <div className={styles.imageContainer}>
                        <AnimatePresence initial={false} custom={direction}>
                            <motion.div
                                key={index}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="absolute"
                            >
                                <img
                                    src={currentImage.src}
                                    alt={currentImage.alt}
                                    className="w-full h-auto"
                                    onLoad={() => setLoaded(true)}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
                {navigation && (
                    <div className={styles.navigationButtons}>
                        {index > 0 && (
                            <button onClick={() => changePhotoId(index - 1)}>
                                &#8249;
                            </button>
                        )}
                        {index < images.length - 1 && (
                            <button onClick={() => changePhotoId(index + 1)}>
                                &#8250;
                            </button>
                        )}
                    </div>
                )}
            </div>
        </MotionConfig>
    );
}

export default SharedModal;
