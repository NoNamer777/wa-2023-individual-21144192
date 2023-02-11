function overviewController() {
    let template;

    /**
     * Fetches a specific slice of data of Races, depending on the pageNumber
     * and creates and inserts cards in the overview with that data.
     */
    async function initializeCards() {
        await raceService.initialized;

        const races = raceService.fetchPaginatedRaces(paginationService.maxCardPerPage, paginationService.pageNumber);

        for (const race of races) {
            raceCardController(race);
        }
    }

    /** Initializes the Overview page. */
    async function initialize() {
        template = await fetchTemplate(`app/pages/overview/${PAGES.overview}`);

        initializeCards();

        document.querySelector('article').replaceWith(template);
    }
    initialize();
}
