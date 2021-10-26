class App {
    constructor() {
        this.init();
    }

    init() {
        this.connectDOM();
        this.setVariables();
        this.setupListeners();

        this.sliderInterval = setInterval(() => {
            this.moveSlider();
        }, 20);

        this.setObserver();
    }

    connectDOM() {
        this.menuIcon = document.querySelector("[data-menu-icon]");
        this.menuIconLines = document.querySelectorAll("[data-menu-icon-line]");

        this.nav = document.querySelector("[data-nav]");
        this.navItems = document.querySelectorAll("[data-nav-item]");

        this.arrowLeft = document.querySelector("[data-arrow-left]");
        this.arrowRight = document.querySelector("[data-arrow-right]");
        this.sliderContainer = document.querySelector("[data-slider-container]");
        this.sliderCards = document.querySelectorAll("[data-slider-card]");

        this.galleryPhotos = document.querySelectorAll("[data-gallery-photo]");

        this.faqBtns = document.querySelectorAll("[data-btn-faq]");

        this.sectionUpcomingEvents = document.getElementById("upcoming-events");
        this.eventPoster1 = document.querySelector("[data-event-poster-1]");
        this.eventPoster2 = document.querySelector("[data-event-poster-2]");
    }

    setVariables() {
        this.isMenuOpen = false;

        this.sliderInterval = null;

        this.observer = null;
        this.observerOptions = {
            root: null,
            threshold: 0,
            rootMargin: "-300px",
        };
    }

    setupListeners() {
        this.menuIcon.addEventListener("click", () => {
            this.menuIconLines.forEach((line) => {
                line.classList.toggle("open");
            });

            if (this.isMenuOpen === false) {
                this.openMenu();
            } else {
                this.closeMenu();
            }
        });

        this.arrowLeft.addEventListener("click", () => {
            this.sliderContainer.scrollLeft -= 100;
        });

        this.arrowRight.addEventListener("click", () => {
            this.sliderContainer.scrollLeft += 100;
        });

        this.sliderCards.forEach((card) => {
            card.addEventListener("mouseover", () => {
                card.style.transform = "scale(1.1)";
                this.pauseSlider();
            });

            card.addEventListener("mouseleave", () => {
                card.style.transform = "scale(1)";

                this.sliderInterval = setInterval(() => {
                    this.moveSlider();
                }, 20);
            });
        });

        this.galleryPhotos.forEach((photo) => {
            photo.addEventListener("click", () => {
                this.galleryPhotos.forEach((photo) => {
                    photo.classList.remove("active");
                });

                photo.classList.add("active");
            });
        });

        this.faqBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                btn.parentElement.classList.toggle("active");
            });
        });
    }

    openMenu() {
        this.nav.style.transform = "translate(0, 100%)";

        this.navItems.forEach((item, idx) => {
            this.isMenuOpen = true;

            setTimeout(() => {
                item.style.transform = "translateX(0)";
            }, idx * 100);
        });
    }

    closeMenu() {
        this.nav.style.transform = "translate(100%, 100%)";

        this.navItems.forEach((item) => {
            this.isMenuOpen = false;

            item.style.transform = "translateX(100%)";
        });
    }

    moveSlider() {
        const maxScroll = this.sliderContainer.scrollWidth - this.sliderContainer.clientWidth;

        if (this.sliderContainer.scrollLeft > maxScroll - 1) {
            this.sliderContainer.scrollLeft = 0;
        } else {
            this.sliderContainer.scrollLeft += 1;
        }
    }

    pauseSlider() {
        clearInterval(this.sliderInterval);
    }

    setObserver() {
        this.observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    this.eventPoster1.animate(
                        [
                            {
                                transform: "translateX(20%) rotate(20deg)",
                            },
                            {
                                transform: "translateX(0) rotate(0deg)",
                            },
                        ],
                        {
                            duration: 700,
                            iterations: 1,
                            fill: "forwards",
                        }
                    );

                    this.eventPoster2.animate(
                        [
                            {
                                transform: "translateX(-20%) rotate(-20deg)",
                            },
                            {
                                transform: "translateX(0) rotate(0deg)",
                            },
                        ],
                        {
                            duration: 700,
                            iterations: 1,
                            fill: "forwards",
                        }
                    );

                    observer.unobserve(entry.target);
                }
            });
        }, this.observerOptions);

        this.observer.observe(this.sectionUpcomingEvents);
    }
}

window.onload = () => {
    const app = new App();
};
