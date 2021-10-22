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
    }

    setVariables() {
        this.isMenuOpen = false;

        this.sliderInterval = null;
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
}

window.onload = () => {
    const app = new App();
};
