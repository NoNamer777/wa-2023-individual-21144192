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
        trait: null,
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
        await (await PaginationService.instance()).setupPagination();
    }

    async #initialize() {
        this.#template = await fetchTemplate('app/pages/overview/overview.page');
        this.#filterSidePanelElem = this.#template.querySelector('.overview aside');

        await this.#setupFilteringPanel();
        await this.fillRaceContainer();

        document.querySelector('article').replaceWith(this.#template);
    }

    async #handleSortingAndFilteringFormSubmission(event) {
        event.preventDefault();
        event.stopImmediatePropagation();

        this.#updateSortingAndFilteringValues();

        // Reset pagination.
        (await PaginationService.instance()).pageNumber = 1;

        // Save sorting and filtering preferences in route.
        this.#storeSortingInRoute();

        // Apply filters and sorting rules
        await this.fillRaceContainer();

        // Close the filtering and sorting side panel
        removeClass(this.#filterSidePanelElem, 'shown');
    }

    async #setupFilteringPanel() {
        // Add filter-btn click handler.
        this.#template.querySelector('.filter-btn').onclick = () => {
            addClass(this.#filterSidePanelElem, 'shown');

            this.#setFilteringPanelValues();
        };

        this.#filterSidePanelElem.querySelector('.close-panel-btn').onclick = () =>
            removeClass(this.#filterSidePanelElem, 'shown');

        // Handle clicks on the overlay
        const overlayContainer = this.#filterSidePanelElem.querySelector('.overlay-container');

        overlayContainer.onclick = (event) => {
            if (event.target !== overlayContainer) return;
            removeClass(this.#filterSidePanelElem, 'shown');
        };

        // Build options on which Races can be sorted.
        this.#setupSortableOptions();

        // Build option for filtering Races by attributes.
        await this.#setupTraitFilteringOptions();

        this.#initFilterAndSortingFromRoute();

        // Handle Filtering and Sorting form submissions.
        this.#filterSidePanelElem.querySelector('form').onsubmit = async (event) =>
            await this.#handleSortingAndFilteringFormSubmission(event);
    }

    async #setupTraitFilteringOptions() {
        const traitFilterElem = this.#filterSidePanelElem.querySelector('#trait-filter');
        const traits = (await RaceService.instance()).races
            .flatMap((race) =>
                race.traits.map((trait) => ({
                    value: trait.name.toLowerCase().replace(/ /g, '-').replace(/'/g, ''),
                    label: trait.name,
                }))
            )
            .sort((t1, t2) => t1.value.localeCompare(t2.value))
            .filter((trait, position, self) => position === self.findIndex((tr) => tr.value === trait.value));

        for (const trait of traits) {
            const optionElem = document.createElement('option');

            optionElem.value = trait.value;
            optionElem.innerText = trait.label;

            traitFilterElem.appendChild(optionElem);
        }
    }

    #initFilterAndSortingFromRoute() {
        const sortingDirectionQueryParam = getQueryParamFromRoute('sortingDirection');

        if (sortingDirectionQueryParam) {
            this.#filters.sortingDirection = sortingDirectionQueryParam;
        }
        const sortingByQueryParam = getQueryParamFromRoute('sortingBy');

        if (sortingByQueryParam) {
            this.#filters.sortingBy = sortingByQueryParam;
        }

    }

    #setFilteringPanelValues() {
        this.#filterSidePanelElem.querySelector('#sorting-direction-asc').checked =
            this.#filters.sortingDirection === SORTING_DIRECTIONS.ascending;

        this.#filterSidePanelElem.querySelector('#sorting-direction-desc').checked =
            this.#filters.sortingDirection === SORTING_DIRECTIONS.descending;

        if (this.#filters.sortingBy) {
            this.#filterSidePanelElem.querySelector('#sorting-by').value = this.#filters.sortingBy;
        }

    #setupSortableOptions() {
        const sortingByAttributeSelectElem = this.#filterSidePanelElem.querySelector('select#sorting-by');
        const optionTemplate = document.createElement('option');

        for (const sortableAttribute of Object.values(SORTABLE_ATTRIBUTES)) {
            const optionElem = optionTemplate.cloneNode();

            optionElem.innerText = capitalize(sortableAttribute);
            optionElem.value = sortableAttribute;

            sortingByAttributeSelectElem.appendChild(optionElem);
        }
    }

    #updateSortingAndFilteringValues() {
        const sortingBy = this.#filterSidePanelElem.querySelector('#sorting-by').value;
        const filterByTrait = this.#filterSidePanelElem.querySelector('#trait-filter').value;

        this.#filters.sortingDirection = this.#filterSidePanelElem.querySelector('#sorting-direction-asc').checked
            ? SORTING_DIRECTIONS.ascending
            : SORTING_DIRECTIONS.descending;
        this.#filters.sortingBy = sortingBy === '' ? null : sortingBy;
        this.#filters.trait = filterByTrait === '' ? null : this.#findTraitByValue(filterByTrait);
    }

    #storeSortingInRoute() {
        const queryParams = { pageNumber: 1, sortingDirection: this.#filters.sortingDirection };

        if (this.#filters.sortingBy) {
            queryParams.sortingBy = this.#filters.sortingBy;
        }
        setCurrentRoute(PAGES.overview, queryParams);
    }

    #findTraitByValue(traitValue) {
        const traitFilterElem = this.#filterSidePanelElem.querySelector('#trait-filter');

        return {
            value: traitValue,
            name: traitFilterElem.querySelector(`option[value='${traitValue}']`).innerText,
        };
    }
}
