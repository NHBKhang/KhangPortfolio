import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { variants } from "../../utils/animationVariants";
import styles from "../../styles/SharedModal.module.css";
import Image from "next/image";
import {
    ArrowDownTrayIcon,
    ArrowTopRightOnSquareIcon,
    ArrowUturnLeftIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";

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
                            >
                                <Image
                                    src={currentImage.src}
                                    alt={currentImage.alt}
                                    width={1280}
                                    height={860}
                                    priority
                                    onLoad={() => setLoaded(true)}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
                <div className={styles.controlsContainer}>
                    {loaded && (
                        <div className={styles.navigationWrapper}>
                            {navigation && (
                                <>
                                    {index > 0 && (
                                        <button
                                            className={styles.navButtonLeft}
                                            onClick={() => changePhotoId(index - 1)}
                                        >
                                            <ChevronLeftIcon className={styles.icon} />
                                        </button>
                                    )}
                                    {index + 1 < images.length && (
                                        <button
                                            className={styles.navButtonRight}
                                            onClick={() => changePhotoId(index + 1)}
                                        >
                                            <ChevronRightIcon className={styles.icon} />
                                        </button>
                                    )}
                                </>
                            )}
                            <div className={styles.topRightControls}>
                                {navigation ? (
                                    <a
                                        href={currentImage.src}
                                        className={styles.controlIcon}
                                        target="_blank"
                                        title="Open fullsize version"
                                        rel="noreferrer"
                                    >
                                        <ArrowTopRightOnSquareIcon className={styles.icon} />
                                    </a>
                                ) : (
                                    <a
                                        href={`https://twitter.com/intent/tweet?text=Check%20out%20this%20pic%20from%20Next.js%20Conf!%0A%0Ahttps://nextjsconf-pics.vercel.app/p/${index}`}
                                        className={styles.controlIcon}
                                        target="_blank"
                                        title="Open fullsize version"
                                        rel="noreferrer"
                                    >
                                        <XMarkIcon className={styles.icon} />
                                    </a>
                                )}
                                <button
                                    onClick={() => downloadPhoto(currentImage.src, `nhbkhang_photo${index}.jpg`)}
                                    className={styles.controlIcon}
                                    title="Download fullsize version"
                                >
                                    <ArrowDownTrayIcon className={styles.icon} />
                                </button>
                            </div>
                            <div className={styles.topLeftControls}>
                                <button
                                    onClick={() => closeModal()}
                                    className={styles.closeButton}
                                >
                                    {navigation ? (
                                        <XMarkIcon className={styles.icon} />
                                    ) : (
                                        <ArrowUturnLeftIcon className={styles.icon} />
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                    {navigation && (
                        <div className={styles.bottomControls} style={images.length > 1 ?
                            {
                                transform: 'translateX(calc(50% - 90px))'
                            } : {

                            }}>
                            <motion.div
                                initial={false}
                                className={styles.bottomNav}
                            >
                                <AnimatePresence initial={false}>
                                    {images.map((image, id) => (
                                        <motion.button
                                            initial={{
                                                width: "0%",
                                                x: `${Math.max((index + 1) * -100, 15 * -100)}%`,
                                            }}
                                            animate={{
                                                scale: id === index ? 1.25 : 1,
                                                width: "100%",
                                                x: `${Math.max(index * -100, 15 * -100)}%`,
                                            }}
                                            exit={{ width: "0%" }}
                                            onClick={() => changePhotoId(id)}
                                            key={id}
                                            className={`${id === index ? styles.thumbnailButtonActive : ''} ${styles.thumbnailButton}`}
                                        >
                                            <Image
                                                alt={image.alt}
                                                width={125}
                                                height={75}
                                                className={id === index ? styles.thumbnailActive : styles.thumbnail}
                                                src={image.src}
                                            />
                                        </motion.button>
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        </div>
                    )}
                </div>
            </div>
        </MotionConfig>
    );
}

export default SharedModal;
