class PaginationService {
    get maxCardPerPage() {
        return this.#maxCardsPerPage;
    }
    #maxCardsPerPage = 5;

    get currentPage() {
        return this.#currentPage;
    }
    set currentPage(currentPage) {
        this.#currentPage = currentPage;
    }
    #currentPage;

    #maxPossiblePages;

    constructor() {
        this.#initializePageNumber();
        this.#constructIndividualPageLinks();
    }

    updateNextAndPreviousLinks() {
        const previousPage = this.#currentPage === 1 ? 1 : this.#currentPage - 1;
        const nextPage = this.#currentPage > this.#maxPossiblePages ? this.#currentPage + 1 : this.#maxPossiblePages;

        const previousPageLink = document.querySelector('a.previous-page');
        const nextPageLink = document.querySelector('a.next-page');

        previousPageLink.href = `#overview?pageNumber=${previousPage}`;
        nextPageLink.href = `#overview?pageNumber=${nextPage}`;

        if (this.#currentPage === 1) {
            if (!linkIsActive(previousPageLink)) {
                previousPageLink.classList.add('active');
            }
        }
        if (this.#currentPage > 1) {
            if (linkIsActive(previousPageLink)) {
                previousPageLink.classList.remove('active');
            }
        }
        if (this.#currentPage < this.#maxPossiblePages) {
            if (linkIsActive(nextPageLink)) {
                nextPageLink.classList.remove('active');
            }
        }
        if (this.#currentPage === this.#maxPossiblePages) {
            if (!linkIsActive(nextPageLink)) {
                nextPageLink.classList.add('active');
            }
        }
    }

    updateActivePageLink() {
        document.querySelector('.pagination-item.active').classList.remove('active');

        document
            .querySelector(`.pagination-item[href='#overview?pageNumber=${this.#currentPage}']`)
            .classList.add('active');
    }

    async #constructIndividualPageLinks() {
        await raceService.initialized;

        this.#maxPossiblePages = Math.ceil(raceService.races.length / this.#maxCardsPerPage);
        const template = await fetchTemplate(`app/components/pagination-link/pagination-link`);

        for (let i = this.#maxPossiblePages; i > 0; i--) {
            const pageLink = this.#constructPageLink(template.cloneNode(true), i);

            if (i === this.#currentPage) {
                pageLink.firstChild.classList.add('active');
            }
            document
                .querySelector('header nav ul:last-of-type')
                .firstElementChild.insertAdjacentElement('afterend', pageLink);
        }
        this.updateNextAndPreviousLinks();
    }

    /** Reads the page number query param in the route. */
    #initializePageNumber() {
        const PageNumberQueryParam = getQueryParam('pageNumber');

        this.#currentPage = PageNumberQueryParam ? parseInt(PageNumberQueryParam) : 1;
    }

    #constructPageLink(pageLink, pageNumber) {
        pageLink.firstChild.href = `#overview?pageNumber=${pageNumber}`;
        pageLink.firstChild.innerText = `${pageNumber}`;

        pageLink.onclick = (event) => {
            if (linkIsActive(pageLink.firstChild)) return;

            this.#currentPage = pageNumber;

            this.updateActivePageLink();

            this.updateNextAndPreviousLinks();
            handleRouting(event);
        };
        return pageLink;
    }
}

const paginationService = new PaginationService();
