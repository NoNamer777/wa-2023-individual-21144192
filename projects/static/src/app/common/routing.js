function handleRouting(event) {
    event.stopPropagation();
    event.preventDefault();

    let target = event.target;

    if (!target.href) {
        target = findParentElement(target, 'A');
    }
    let pageName = target.href.split('#')[1].replace(/\?.*/, '');
    const queryParams = getQueryParams(target.href.split('?')[1]);

    if (pageName === '' || !pageName) pageName = PAGES.overview;

    loadPage(pageName, queryParams);
}
