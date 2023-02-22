class AppComponent {
    /** Handles initializing the application. */
    static async initialize() {
        this.#instance = new AppComponent();

        await HeaderComponent.initialize();
        await FooterComponent.initialize();

        await this.#instance.#loadPageFromURL();
    }

    static get instance() {
        return this.#instance;
    }
    static #instance;

    get currentPage() {
        return this.#currentPage;
    }
    #currentPage;

    async loadPage(page) {
        this.#currentPage = page;

        switch (page) {
            case PAGES.overview:
                await OverviewPage.initialize();
                break;
            default:
                return false;
        }
        this.#setPageStyle();
        this.#setWindowTitle();
        HeaderComponent.instance.activateLinkFromActivePage();

        return true;
    }

    async #loadPageFromURL() {
        const page = location.hash.slice(2).replace(/\?.*/, '');

        if (!(await this.loadPage(page))) {
            setCurrentRoute(PAGES.overview, {});

            await this.loadPage(PAGES.overview);
        }
    }

    #setPageStyle() {
        const styleLocation = `app/pages/${this.#currentPage}/${this.#currentPage}.page.css`;
        let styleLink = document.querySelector(`head link[href='']`);

        if (!styleLink) {
            styleLink = document.querySelector(`head link[href='${styleLocation}']`);
        }
        styleLink.href = styleLocation;
    }

    #setWindowTitle() {
        document.querySelector('head title').innerText = APP_TITLE_PREFIX + capitalize(this.#currentPage);
    }
}
