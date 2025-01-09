import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import useKeypress from "react-use-keypress";
import SharedModal from "./SharedModal";
import styles from "../styles/Modal.module.css";

const Modal = ({ images, onClose, index = 0 }) => {
    const overlayRef = useRef();
    const router = useRouter();

    const [direction, setDirection] = useState(0);
    const [curIndex, setCurIndex] = useState(index);

    const handleClose = () => {
        if (onClose) onClose();
    }

    const changePhotoId = (newVal) => {
        setDirection(newVal > index ? 1 : -1);
        setCurIndex(newVal);
        router.push({ query: { photoId: newVal } }, `/p/${newVal}`, { shallow: true });
    }

    useKeypress("ArrowRight", () => {
        if (index + 1 < images.length) changePhotoId(index + 1);
    });

    useKeypress("ArrowLeft", () => {
        if (index > 0) changePhotoId(index - 1);
    });

    return (
        <Dialog
            static
            open={true}
            onClose={handleClose}
            initialFocus={overlayRef}
            className={styles.modalContainer}
        >
            <Dialog.Overlay
                ref={overlayRef}
                as={motion.div}
                className={`${styles.overlay} ${styles.overlayVisible}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            />
            <div className={styles.modalContent}>
                <SharedModal
                    index={curIndex}
                    direction={direction}
                    images={images}
                    changePhotoId={changePhotoId}
                    closeModal={handleClose}
                    navigation={true}
                />
            </div>
        </Dialog>
    );
}

export default Modal;
