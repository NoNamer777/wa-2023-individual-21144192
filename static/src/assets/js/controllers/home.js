function homeController() {
    async function initialize() {
        const template = await fetchTemplate(`pages/${PAGES.home}`);

        document.querySelector('main article').replaceWith(template);
    }
    initialize();
}
