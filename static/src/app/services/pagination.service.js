class PaginationService {
    get maxCardPerPage() {
        return this.#maxCardsPerPage;
    }
    #maxCardsPerPage = 5;

    get pageNumber() {
        return this.#pageNumber;
    }
    #pageNumber;
    #currentPage;

    constructor() {
        this.#initializePageNumber();
        this.#constructIndividualPageLinks();
    }

    /** Reads the pageNumber query param in the route. */
    #initializePageNumber() {
        const pageNumberQueryParam = getQueryParam('pageNumber');

        this.#pageNumber = pageNumberQueryParam ? parseInt(pageNumberQueryParam) : 1;
    }
}

const paginationService = new PaginationService();
