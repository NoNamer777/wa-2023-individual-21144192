function overviewController() {
    async function initialize() {
        const template = await fetchTemplate(`pages/${PAGES.overview}`);

        document.querySelector('article').replaceWith(template);
    }
    initialize();
}
