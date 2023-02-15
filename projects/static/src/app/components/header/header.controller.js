function headerController() {
    let template;

    function updateActiveClass() {
        template.querySelector('.active')?.classList.remove('active');
        template.querySelector(`[href='#${getCurrentPage()}']`).classList.add('active');
    }

    async function initialize() {
        template = await fetchTemplate(`app/components/header/${PAGES.header}`);

        template.querySelectorAll('a').forEach((elem) => {
            elem.onclick = (event) => {
                handleRouting(event);
                updateActiveClass();
            };
        });

        template.querySelectorAll('.pagination a').forEach((elem) => {
            elem.onclick = (event) => {
                if (linkIsActive(event.target)) return;

                paginationService.currentPage = parseInt(getQueryParams(event.target.href.split('?')[1]).pageNumber);
                paginationService.updateActivePageLink();

                paginationService.updateNextAndPreviousLinks();
                handleRouting(event);
            };
        });

        updateActiveClass();

        document.querySelector('header').replaceWith(template);
    }
    initialize();
}
