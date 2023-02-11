function handleRouting(event) {
    event.stopPropagation();
    event.preventDefault();

    let target = event.target;

    if (!target.href) {
        target = findParentElement(target, 'A');
    }
    let controllerName = target.href.split('#')[1];

    if (controllerName === '' || !controllerName) controllerName = PAGES.overview;

    loadPage(controllerName);
}
