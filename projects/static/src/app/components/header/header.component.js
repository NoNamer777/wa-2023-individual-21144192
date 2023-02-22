class HeaderComponent {
    static get instance() {
        return this.#instance;
    }
    static #instance;

    static async initialize() {
        this.#instance = new HeaderComponent();

        await this.#instance.#initialize();
    }

    #template;

    activateLinkFromActivePage() {
        const page = AppComponent.instance.currentPage;
        const link = this.#template.querySelector(`ul:first-of-type a[href*=${page}]`);

        link.classList.add('active');
    }

    async #initialize() {
        this.#template = await fetchTemplate('app/components/header/header.component');

        this.#template.querySelectorAll('.pagination a').forEach((elem) => {
            elem.onclick = async (event) =>
                await (await PaginationService.instance()).handlePaginationEvent(event, elem);
        });

        this.#template.querySelectorAll('a:not(.pagination li > a)').forEach((elem) => {
            elem.onclick = (event) => {
                event.stopImmediatePropagation();
                event.preventDefault();

                let route = findParentElement(event.target, 'A').href.split('#')[1].replace('/', '');

                if (route === '') {
                    route = PAGES.overview;
                }
                setCurrentRoute(route, {});
                AppComponent.instance.loadPage(route);
            };
        });

        document.querySelector('header').replaceWith(this.#template);
    }
}
