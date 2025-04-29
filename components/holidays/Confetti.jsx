import confetti from "canvas-confetti";
import { useEffect } from "react";

const Confetti = () => {

    useEffect(() => {
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
        }
    }, []);

    return <></>;
}

export default Confetti;