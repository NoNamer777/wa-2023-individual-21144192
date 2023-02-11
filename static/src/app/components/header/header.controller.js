function headerController() {
    let template;

    function updateActiveClass() {
        template.querySelector('.active')?.classList.remove('active');
        template.querySelector(`[href='#${getCurrentPage()}']`).classList.add('active');
    }

    async function initialize() {
        template = await fetchTemplate(`app/components/header/${PAGES.header}`);

        template.querySelectorAll('a').forEach((elem) =>
            elem.addEventListener('click', (event) => {
                handleRouting(event);
                updateActiveClass();
            })
        );

        updateActiveClass();

        document.querySelector('header').replaceWith(template);
    }
    initialize();
}
