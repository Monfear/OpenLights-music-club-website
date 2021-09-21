class App {
    constructor() {
        this.init();
    }

    init() {
        this.connectDOM();
        this.setVariables();
        this.setupListeners();
    }

    connectDOM() {
        this.menuIcon = document.querySelector("[data-menu-icon]");
        this.menuIconLines = document.querySelectorAll("[data-menu-icon-line]");
        this.navItems = document.querySelectorAll("[data-nav-item]");

        this.nav = document.querySelector(".nav");
    }

    setVariables() {
        this.isMenuOpen = false;
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
    }

    openMenu() {
        this.navItems.forEach((item, idx) => {
            this.isMenuOpen = true;

            setTimeout(() => {
                item.style.transform = "translateX(0)";
            }, idx * 45);
        });
    }

    closeMenu() {
        this.isMenuOpen = false;

        this.navItems.forEach((item) => {
            item.style.transform = "translateX(100%)";
        });
    }
}

window.onload = () => {
    const app = new App();
};
