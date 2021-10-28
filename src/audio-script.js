class AudioPlayer {
    constructor() {
        this.init();
    }

    init() {
        this.connectDOM();
        this.setVariables();
        this.setupListeners();
    }

    connectDOM() {
        this.playerVideo = document.querySelector("[data-player-video]");
        this.musicTitle = document.querySelector("[data-music-title]");
        this.songAudio = document.querySelector("[data-song-audio]");
        this.playerVinyl = document.querySelector("[data-player-vinyl]");
        this.playBtn = document.querySelector("[data-play-btn]");
        this.prevBtn = document.querySelector("[data-prev-btn]");
        this.nextBtn = document.querySelector("[data-next-btn]");
        this.progressContainer = document.querySelector("[data-progress-container]");
        this.progressBar = document.querySelector("[data-progress-bar-music]");
    }

    setVariables() {
        this.isPlaying = false;
        this.isLoaded = false;
        this.songNumber = 0;

        this.songs = [
            {
                title: "Kellee Maize - In Tune",
                src: "./../music/Kellee_Maize_-_In_Tune_-_Remix_2__2017_Version_.mp3",
            },

            {
                title: "Lukhash - The other side",
                src: "./../music/LukHash_-_THE_OTHER_SIDE.mp3",
            },

            {
                title: "The Madpix Project - Bad Chick",
                src: "./../music/The.madpix.project_-_Bad_Chick.mp3",
            },

            {
                title: "The Aluminium Tough - Round The Twist",
                src: "./../music/The_Aluminium_Tough_-_Round_The_Twist.mp3",
            },
        ];
    }

    setupListeners() {
        this.playBtn.addEventListener("click", () => {
            if (!this.isPlaying) {
                this.startPlaying();
            } else {
                this.stopPlaying();
            }
        });

        this.nextBtn.addEventListener("click", () => {
            this.playNextSong();
        });

        this.prevBtn.addEventListener("click", () => {
            this.playPrevSong();
        });

        this.songAudio.addEventListener("timeupdate", (e) => {
            this.updateTime(e);
        });

        this.progressContainer.addEventListener("click", (e) => {
            if (this.isPlaying) {
                this.setTime(e);
            }
        });

        this.songAudio.addEventListener("ended", () => {
            this.playNextSong();
        });
    }

    startPlaying() {
        this.isPlaying = true;

        this.playerVideo.play();

        this.playBtn.children[0].classList.remove("fa-play");
        this.playBtn.children[0].classList.add("fa-pause");

        this.playerVinyl.classList.add("active");

        if (!this.isLoaded) {
            this.isLoaded = true;

            this.setSong(this.songNumber);
        }

        this.songAudio.play();
    }

    stopPlaying() {
        this.isPlaying = false;

        this.playerVideo.pause();

        this.playBtn.children[0].classList.remove("fa-pause");
        this.playBtn.children[0].classList.add("fa-play");

        this.playerVinyl.classList.remove("active");

        this.songAudio.pause();
    }

    setSong(idx) {
        this.musicTitle.innerText = this.songs[idx].title;
        this.songAudio.src = this.songs[idx].src;
    }

    playNextSong() {
        this.songNumber++;

        if (this.songNumber >= this.songs.length) {
            this.songNumber = 0;
        }

        this.setSong(this.songNumber);

        if (this.isPlaying) {
            this.songAudio.play();
        }
    }

    playPrevSong() {
        this.songNumber--;

        if (this.songNumber < 0) {
            this.songNumber = this.songs.length - 1;
        }

        this.setSong(this.songNumber);

        if (this.isPlaying) {
            this.songAudio.play();
        }
    }

    updateTime(e) {
        const { duration, currentTime } = e.srcElement;

        const progress = (currentTime / duration) * 100;
        this.progressBar.style.width = `${progress}%`;
    }

    setTime(e) {
        const elementWidth = this.progressContainer.clientWidth;
        const position = e.offsetX;
        const duration = this.songAudio.duration;

        this.songAudio.currentTime = (position / elementWidth) * duration;
    }
}

window.onload = () => {
    const app = new AudioPlayer();
};
