function footerController() {
    async function initialize() {
        const template = await fetchTemplate(`app/components/footer/${PAGES.footer}`);

        document.querySelector('footer').replaceWith(template);
    }
    initialize();
}
