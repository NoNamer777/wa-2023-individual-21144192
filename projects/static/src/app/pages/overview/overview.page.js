class OverviewPage {
    static async initialize() {
        this.#instance = await new OverviewPage();

        await this.#instance.#initialize();
    }

    static get instance() {
        return this.#instance;
    }
    static #instance;

    #template;

    #raceCardTemplate;

    #filterSidePanelElem;

    #filters = {
        sortingBy: null,
        sortingDirection: SORTING_DIRECTIONS.ascending,
    };

    async fillRaceContainer() {
        const raceContainerElem = this.#template.querySelector('.race-container');

        if (!this.#raceCardTemplate) {
            this.#raceCardTemplate = await fetchTemplate('app/components/race-card/race-card.component');
        }
        raceContainerElem.innerHTML = '';

        for (const raceData of await (await RaceService.instance()).getRacesInRange(this.#filters)) {
            const raceCard = new RaceCardComponent(raceData, this.#raceCardTemplate.cloneNode(true));
            raceContainerElem.appendChild(raceCard.template);
        }
    }

    async #initialize() {
        this.#template = await fetchTemplate('app/pages/overview/overview.page');
        this.#filterSidePanelElem = this.#template.querySelector('.overview aside');

        await this.fillRaceContainer();
        await this.#setupFilterButton();
        this.#setupFilterPanel();

        document.querySelector('article').replaceWith(this.#template);
    }

    async #setupFilterButton() {
        const button = this.#template.querySelector('.filter-btn');
        const filterIcon = await fetchSVG('assets/images/icons/filter.icon');

        button.appendChild(filterIcon);

        button.onclick = () => addClass(this.#filterSidePanelElem, 'shown');
    }

    #setupFilterPanel() {
        // Handle Filtering and Sorting form submissions.
        this.#filterSidePanelElem.querySelector('form').onsubmit = async (event) => {
            event.preventDefault();
            event.stopImmediatePropagation();

            const sortingBy = this.#filterSidePanelElem.querySelector('#sorting-by').value;

            this.#filters.sortingDirection = this.#filterSidePanelElem.querySelector('#sorting-direction-asc').checked
                ? SORTING_DIRECTIONS.ascending
                : SORTING_DIRECTIONS.descending;
            this.#filters.sortingBy = sortingBy === '' ? null : sortingBy;

            (await PaginationService.instance()).pageNumber = 1;
            setCurrentRoute(PAGES.overview, { pageNumber: 1 });

            await this.fillRaceContainer();

            removeClass(this.#filterSidePanelElem, 'shown');
        };
    }
}
