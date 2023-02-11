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
    }
}

const paginationService = new PaginationService();
