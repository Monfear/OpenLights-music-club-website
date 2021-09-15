class App {
    constructor() {
        this.init();
    }

    init() {
        this.connectDOM();
        this.setVariables();
        this.setupListeners();
    }

    connectDOM() {}

    setVariables() {}

    setupListeners() {}
}

window.onload = () => {
    const app = new App();
};
