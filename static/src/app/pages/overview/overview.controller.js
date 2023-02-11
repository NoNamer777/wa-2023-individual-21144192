function overviewController() {
    const maxCardsPerPage = 5;
    let pageNumber;
    let template;

    /** Reads the pageNumber query param in the route. */
    function initializePageNumber() {
        const pageNumberQueryParam = getQueryParam('pageNumber');

        pageNumber = pageNumberQueryParam ? parseInt(pageNumberQueryParam) : 1;
    }

    /**
     * Fetches a specific slice of data of Races, depending on the pageNumber
     * and creates and inserts cards in the overview with that data.
     */
    async function initializeCards() {
        await raceService.initialized;

        const races = raceService.fetchPaginatedRaces(maxCardsPerPage, pageNumber);

        for (const race of races) {
            raceCardController(race);
        }
    }

    /** Initializes the Overview page. */
    async function initialize() {
        template = await fetchTemplate(`app/pages/overview/${PAGES.overview}`);

        initializePageNumber();
        initializeCards();

        document.querySelector('article').replaceWith(template);
    }
    initialize();
}
