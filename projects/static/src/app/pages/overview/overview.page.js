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

        this.#filters.sortingDirection = getQueryParamFromRoute('sortingDirection');

        const sortingByQueryParam = getQueryParamFromRoute('sortingBy');

        if (sortingByQueryParam) {
            this.#filters.sortingBy = sortingByQueryParam;
        }
        await this.fillRaceContainer();
        await this.#setupFilterButton();
        this.#setupFilteringPanel();

        document.querySelector('article').replaceWith(this.#template);
    }

    async #setupFilterButton() {
        const button = this.#template.querySelector('.filter-btn');
        const filterIcon = await fetchSVG('assets/images/icons/filter.icon');

        button.appendChild(filterIcon);

        button.onclick = () => {
            addClass(this.#filterSidePanelElem, 'shown');

            this.#setFilteringPanelValues();
        };
    }

    #setupFilteringPanel() {
        const sortingByAttributeSelectElem = this.#filterSidePanelElem.querySelector('select#sorting-by');
        const optionTemplate = document.createElement('option');

        // Build options on which Races can be sorted.
        for (const sortableAttribute of Object.values(SORTABLE_ATTRIBUTES)) {
            const optionElem = optionTemplate.cloneNode();

            optionElem.innerText = capitalize(sortableAttribute);
            optionElem.value = sortableAttribute;

            sortingByAttributeSelectElem.appendChild(optionElem);
        }

        // Handle Filtering and Sorting form submissions.
        this.#filterSidePanelElem.querySelector('form').onsubmit = async (event) => {
            event.preventDefault();
            event.stopImmediatePropagation();

            const sortingBy = this.#filterSidePanelElem.querySelector('#sorting-by').value;

            this.#filters.sortingDirection = this.#filterSidePanelElem.querySelector('#sorting-direction-asc').checked
                ? SORTING_DIRECTIONS.ascending
                : SORTING_DIRECTIONS.descending;
            this.#filters.sortingBy = sortingBy === '' ? null : sortingBy;

            // Reset pagination.
            (await PaginationService.instance()).pageNumber = 1;

            // Save sorting and filtering preferences in route.
            const queryParams = { pageNumber: 1, sortingDirection: this.#filters.sortingDirection };

            if (this.#filters.sortingBy) {
                queryParams.sortingBy = this.#filters.sortingBy;
            }
            setCurrentRoute(PAGES.overview, queryParams);

            // Apply filters and sorting rules
            await this.fillRaceContainer();

            // Close the filtering and sorting side panel
            removeClass(this.#filterSidePanelElem, 'shown');
        };
    }

    #setFilteringPanelValues() {
        this.#filterSidePanelElem.querySelector('#sorting-direction-asc').checked =
            this.#filters.sortingDirection === SORTING_DIRECTIONS.ascending;

        this.#filterSidePanelElem.querySelector('#sorting-direction-desc').checked =
            this.#filters.sortingDirection === SORTING_DIRECTIONS.descending;

        if (this.#filters.sortingBy) {
            this.#filterSidePanelElem.querySelector('#sorting-by').value = this.#filters.sortingBy;
        }
    }
}
