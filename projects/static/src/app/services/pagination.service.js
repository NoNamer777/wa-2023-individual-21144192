class PaginationService {
    static async instance() {
        if (!this.#instance) {
            this.#instance = new PaginationService();

            await this.#instance.setupPagination();
        }
        return this.#instance;
    }
    static #instance;

    set pageNumber(pageNumber) {
        this.#currentPage = pageNumber;

        // Move over the active class to the last clicked pagination-item.
        removeClass(document.querySelector('header .pagination-item.active'), 'active');
        addClass(document.querySelector(`header .pagination-item[href*='pageNumber=${this.#currentPage}']`), 'active');

        this.#updatePreviousAndNextPageLinks();
    }

    get pageNumber() {
        return this.#currentPage;
    }
    #currentPage = 1;

    get maxItemsPerPage() {
        return this.#maxItemsPerPage;
    }
    #maxItemsPerPage = 5;

    #maxNumberOfPages = 1;

    #paginationItemTemplate;

    async handlePaginationEvent(event, elem) {
        // Prevent default navigation.
        event.preventDefault();
        event.stopImmediatePropagation();

        // Prevent pagination when the page is already selected.
        if (elemHasClass(elem, 'active')) return;

        // Update the current page, route, and previous and next page links
        const queryParams = getQueryParams(elem.href.split('?')[1]);

        this.pageNumber = parseInt(queryParams.pageNumber);

        setCurrentRoute(AppComponent.instance.currentPage, queryParams, true);

        await OverviewPage.instance.fillRaceContainer();
    }

    async setupPagination() {
        document
            .querySelectorAll('header ul.pagination .pagination-item')
            .forEach((elem) => elem.parentElement.remove());

        this.#maxNumberOfPages = Math.ceil((await RaceService.instance()).numberOfRaces / this.#maxItemsPerPage);

        this.#initializeCurrentPage();

        if (!this.#paginationItemTemplate) {
            this.#paginationItemTemplate = await fetchTemplate(
                'app/components/pagination-link/pagination-link.component'
            );
        }

        for (let i = this.#maxNumberOfPages; i > 0; i--) {
            const pageLinkTemplate = this.#constructPaginationLink(this.#paginationItemTemplate.cloneNode(true), i);

            document
                .querySelector('header ul.pagination li:first-of-type')
                .insertAdjacentElement('afterend', pageLinkTemplate);
        }
        this.#activatePageLinkFromURL();
        this.#updatePreviousAndNextPageLinks();
    }

    #initializeCurrentPage() {
        const pageNumber = getQueryParamFromRoute('pageNumber');

        if (!pageNumber) {
            this.#currentPage = 1;
        } else {
            this.#currentPage = parseInt(pageNumber);
        }
    }

    #constructPaginationLink(template, pageNumber) {
        const anchorElem = template.querySelector('a');

        anchorElem.innerText = pageNumber;
        anchorElem.href = '#/overview?pageNumber=' + pageNumber;

        anchorElem.onclick = (event) => this.handlePaginationEvent(event, anchorElem);

        return template;
    }

    #activatePageLinkFromURL() {
        let pageNumber = getQueryParamFromRoute('pageNumber');

        if (!pageNumber) {
            pageNumber = this.#currentPage;
        }
        document.querySelector(`header .pagination-item[href*='pageNumber=${pageNumber}']`).classList.add('active');
    }

    #updatePreviousAndNextPageLinks() {
        const previousPage = this.#currentPage > 1 ? this.#currentPage - 1 : 1;
        const nextPage = this.#currentPage < this.#maxNumberOfPages ? this.#currentPage + 1 : this.#maxNumberOfPages;

        document.querySelector('header .previous-page').href = `#/overview?pageNumber=${previousPage}`;
        document.querySelector('header .next-page').href = `#/overview?pageNumber=${nextPage}`;

        this.#markPreviousAndNextPageLinks();
    }

    #markPreviousAndNextPageLinks() {
        const previousPageLink = document.querySelector('header .previous-page');
        const nextPageLink = document.querySelector('header .next-page');

        if (this.#currentPage === 1) {
            addClass(previousPageLink, 'active');
        } else if (this.#currentPage > 1 && elemHasClass(previousPageLink, 'active')) {
            removeClass(previousPageLink, 'active');
        }

        if (this.#currentPage === this.#maxNumberOfPages) {
            addClass(nextPageLink, 'active');
        } else if (this.#currentPage < this.#maxNumberOfPages && elemHasClass(nextPageLink, 'active')) {
            removeClass(nextPageLink, 'active');
        }
    }
}
