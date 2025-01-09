import { useRouter } from "next/router";
import SharedModal from "./SharedModal";
import styles from "../styles/Carousel.module.css";

const Carousel = ({ index, images }) => {
    const router = useRouter();

    const closeModal = () => {
        window.location.reload();
    }

    const changePhotoId = (newVal) => {
        return newVal;
    }

    return (
        <div className={styles.carouselContainer}>
            <div className={styles.overlay} onClick={closeModal} />
            <SharedModal
                index={index}
                images={images}
                changePhotoId={changePhotoId}
                closeModal={closeModal}
                navigation={false}
            />
        </div>
    );
}

export default Carousel;
