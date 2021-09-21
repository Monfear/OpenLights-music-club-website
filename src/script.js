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

        this.nav = document.querySelector("[data-nav]");
        this.navItems = document.querySelectorAll("[data-nav-item]");
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
}

window.onload = () => {
    const app = new App();
};
