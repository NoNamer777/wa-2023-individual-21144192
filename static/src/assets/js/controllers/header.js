function headerController() {
    async function initialize() {
        const template = await fetchTemplate(PAGES.header);

        document.querySelector('.header').replaceWith(template);
    }
    initialize();
}
