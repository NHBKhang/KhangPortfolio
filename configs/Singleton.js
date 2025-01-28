class AudioSingleton {
    constructor() {
        if (typeof window !== "undefined" && !AudioSingleton.instance) {
            this.audio = new Audio();
            this.audio.loop = true;
            AudioSingleton.instance = this;
        }
        return AudioSingleton.instance;
    }

    play() {
        let isPlaying = false;

        try {
            this.audio.src = "/sound/happy_birthday.mp3";
            this.audio.play()
                .then(() => {
                    isPlaying = true;
                    console.log("Playing happy birthday song!");
                })
                .catch((error) => {
                    isPlaying = false;
                    console.error("Error playing audio:", error);
                });
        } catch (error) {
            isPlaying = false;
            console.error("Unexpected error:", error);
        }

        return isPlaying;
    }

    pause() {
        this.audio.pause();
    }

    setVolume(volume) {
        this.audio.volume = Math.min(Math.max(volume, 0), 1);
    }
}

const instance = new AudioSingleton();
Object.freeze(instance);
export default instance;
