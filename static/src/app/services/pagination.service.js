class PaginationService {
    get maxCardPerPage() {
        return this.#maxCardsPerPage;
    }
    #maxCardsPerPage = 5;

    get currentPage() {
        return this.#currentPage;
    }
    #currentPage;

    constructor() {
        this.#initializePageNumber();
        this.#constructIndividualPageLinks();
    }

    /** Reads the page number query param in the route. */
    #initializePageNumber() {
        const PageNumberQueryParam = getQueryParam('pageNumber');

        this.#currentPage = PageNumberQueryParam ? parseInt(PageNumberQueryParam) : 1;
    }

    async #constructIndividualPageLinks() {
        await raceService.initialized;

        const maxPossiblePages = Math.ceil(raceService.races.length / this.#maxCardsPerPage);

        const template = await fetchTemplate(`app/components/pagination-link/pagination-link`);

        for (let i = maxPossiblePages; i > 0; i--) {
            const pageLink = template.cloneNode(true);

            pageLink.firstChild.href = `#overview?currentPage=${i}`;
            pageLink.firstChild.innerText = `${i}`;

            pageLink.addEventListener('click', (event) => handleRouting(event));

            document
                .querySelector('header nav ul:last-of-type')
                .firstElementChild.insertAdjacentElement('afterend', pageLink);
        }
    }
}

const paginationService = new PaginationService();
