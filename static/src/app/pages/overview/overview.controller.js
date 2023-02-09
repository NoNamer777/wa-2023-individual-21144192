function overviewController() {
    async function initialize() {
        const template = await fetchTemplate(`app/pages/overview/${PAGES.overview}`);

        document.querySelector('article').replaceWith(template);
    }
    initialize();
}
