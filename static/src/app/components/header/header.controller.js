function headerController() {
    async function initialize() {
        const template = await fetchTemplate(`app/components/header/${PAGES.header}`);

        document.querySelector('header').replaceWith(template);
    }
    initialize();
}
