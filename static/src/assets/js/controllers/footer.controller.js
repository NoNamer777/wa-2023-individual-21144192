function footerController() {
    async function initialize() {
        const template = await fetchTemplate(PAGES.footer);

        document.querySelector('footer').replaceWith(template);
    }
    initialize();
}
