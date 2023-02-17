class FooterComponent {
    static async initialize() {
        this.#instance = new FooterComponent();

        await this.#instance.#initialize();
    }
    static #instance;

    async #initialize() {
        const template = await fetchTemplate('app/components/footer/footer.component');

        document.querySelector('footer').replaceWith(template);
    }
}
