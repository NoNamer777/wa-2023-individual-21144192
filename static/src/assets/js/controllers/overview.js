function overviewController() {
    async function initialize() {
        const template = await fetchTemplate(`pages/${PAGES.overview}`);

        document.querySelector('main article').replaceWith(template);
    }
    initialize();
}
