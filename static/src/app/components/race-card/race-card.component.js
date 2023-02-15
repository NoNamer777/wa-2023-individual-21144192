class RaceCardComponent {
    get template() {
        return this.#template;
    }
    #template;

    #raceData;

    constructor(raceData, template) {
        this.#raceData = raceData;
        this.#template = template;

        this.#initialize();
    }

    #initialize() {
        this.#populateTemplate();
    }

    #populateTemplate() {
        this.#template.querySelector('.card-title').innerText = this.#raceData.name;

        const imgElem = this.#template.querySelector('img');
        imgElem.src = this.#raceData.imgSrc;
        imgElem.alt = this.#raceData.name + ' depiction';

        this.#template.querySelector('.race-size p:last-of-type').innerText = this.#raceData.size;
        this.#template.querySelector('.race-speed p:last-of-type').innerText = this.#raceData.speed;
    }
}
