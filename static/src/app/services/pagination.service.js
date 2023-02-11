class PaginationService {
    get maxCardPerPage() {
        return this.#maxCardsPerPage;
    }
    #maxCardsPerPage = 5;

    get currentPage() {
        return this.#currentPage;
    }
    #currentPage;

    #maxPossiblePages;

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

        this.#maxPossiblePages = Math.ceil(raceService.races.length / this.#maxCardsPerPage);
        const template = await fetchTemplate(`app/components/pagination-link/pagination-link`);

        for (let i = this.#maxPossiblePages; i > 0; i--) {
            const pageLink = template.cloneNode(true);

            pageLink.firstChild.href = `#overview?currentPage=${i}`;
            pageLink.firstChild.innerText = `${i}`;

            pageLink.addEventListener('click', (event) => {
                handleRouting(event);
                this.#updateNextAndPreviousLinks();
            });

            document
                .querySelector('header nav ul:last-of-type')
                .firstElementChild.insertAdjacentElement('afterend', pageLink);
        }
        this.#updateNextAndPreviousLinks();
    }

    #updateNextAndPreviousLinks() {
        const previousPage = this.#currentPage === 1 ? 1 : this.#currentPage - 1;
        const nextPage = this.#currentPage > this.#maxPossiblePages ? this.#currentPage + 1 : this.#maxPossiblePages;

        document.querySelector('a.previous-page').href = `#overview?pageNumber=${previousPage}`;
        document.querySelector('a.next-page').href = `#overview?pageNumber=${nextPage}`;
    }
}

const paginationService = new PaginationService();
