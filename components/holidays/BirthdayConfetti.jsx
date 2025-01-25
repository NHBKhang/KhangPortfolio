import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import audioSingleton from "../../configs/Singleton";
import styles from "../../styles/Birthday.module.css";
import { GiSoundOn, GiSoundOff } from "react-icons/gi";
import FloatingBalloons from "./FloatingBalloons";
import { useHoliday } from "../../configs/HolidayContext";

const BirthdayConfetti = () => {
    const { isBirthday } = useHoliday();
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (isBirthday) {
            setIsPlaying(audioSingleton.play());
            audioSingleton.setVolume(0.3);

            const launchConfetti = () => {
                confetti({
                    particleCount: 150,
                    spread: 100,
                    origin: { x: 0.5, y: 0.5 },
                    colors: ["#ff69b4", "#ff4500", "#ffd700", "#32cd32", "#87cefa"],
                });

                setTimeout(() => {
                    confetti({
                        particleCount: 100,
                        spread: 120,
                        startVelocity: 30,
                        origin: { x: Math.random(), y: Math.random() },
                    });
                }, 500);
            };

            const interval = setInterval(launchConfetti, 5000);
            launchConfetti();

            return () => {
                clearInterval(interval);
                audioSingleton.pause();
            }
        }
    }, [isBirthday]);

    const handlePlayMusic = () => {
        if (isPlaying)
            audioSingleton.pause();
        else
            audioSingleton.play();
        setIsPlaying(!isPlaying);
    }

    if (!isBirthday) return null;

    return (
        <div className={styles.container}>
            <button
                onClick={handlePlayMusic}
                className={styles.toggleButton}
            >
                {isPlaying ? <GiSoundOff /> : <GiSoundOn />}
            </button>
            <div>
                <FloatingBalloons />
            </div>
            {/* <p>🎉 Chúc mừng sinh nhật! 🎉</p> */}
        </div>
    );
};

export default BirthdayConfetti;
