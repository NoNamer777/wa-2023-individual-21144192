function raceCardController(race) {
    /** Initializes a Race card component */
    async function initialize() {
        const raceCardTemplate = await fetchTemplate(`app/components/race-card/race-card`);

        // Populate different elements with data from a Race.
        raceCardTemplate.querySelector('.card-title').innerText = race.name;

        const raceImageElem = raceCardTemplate.querySelector('img');
        raceImageElem.src = race.imgSrc;
        raceImageElem.alt = `Depiction of the ${race.name}`;

        raceCardTemplate.querySelector('.race-size p:last-of-type').innerText = race.size;
        raceCardTemplate.querySelector('.race-speed p:last-of-type').innerText = race.speed + ' ft.';

        // Append the Race card to the race card container.
        document.querySelector('.race-container').appendChild(raceCardTemplate);
    }

    initialize();
}
