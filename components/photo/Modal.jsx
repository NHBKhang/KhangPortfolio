import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import useKeypress from "react-use-keypress";
import SharedModal from "./SharedModal";
import styles from "../../styles/Modal.module.css";

const Modal = ({ images, onClose, index = 0, navigation = true }) => {
    const overlayRef = useRef();

    const [direction, setDirection] = useState(0);
    const [curIndex, setCurIndex] = useState(index);

    const handleClose = () => {
        if (onClose) onClose();
    }

    const changePhotoId = (newVal) => {
        setDirection(newVal > index ? 1 : -1);
        setCurIndex(newVal);
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
            <SharedModal
                index={curIndex}
                direction={direction}
                images={images}
                changePhotoId={changePhotoId}
                closeModal={handleClose}
                navigation={navigation}
            />
        </Dialog>
    );
}

export default Modal;
