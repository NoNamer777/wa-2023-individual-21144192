function footerController() {
    async function initialize() {
        const template = await fetchTemplate(`app/components/footer/${PAGES.footer}`);

        template
            .querySelectorAll('a')
            .forEach((elem) => elem.addEventListener('click', (event) => handleRouting(event)));

        document.querySelector('footer').replaceWith(template);
    }
    initialize();
}
