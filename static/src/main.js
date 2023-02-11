function getCurrentPage() {
    return location.hash.slice(1).replace(/\?.*/, '');
}

function setCurrentPage(name, queryParams) {
    const queryParamsString = stringifyQueryParams(queryParams);

    location.hash = name + queryParamsString;

    document.querySelector('head title').innerText = `${APP_TITLE_PREFIX}${capitalize(name)}`;
}

/**
 * Dynamically loads the style for the current page.
 * @param {string} name The name of the page to load the styles for.
 */
function togglePageStyle(name) {
    const stylesheetLocation = `app/pages/${name}/${name}.css`;
    let link = window.document.querySelector(`head link[href='']`);

    if (!link) {
        link = window.document.querySelector(`head link[href='app/pages/${getCurrentPage()}/${getCurrentPage()}.css']`);
    }
    if (!stylesheetLocation) {
        throw new Error(`Could not find the stylesheet for the current page. ('${name}')`);
    }
    link.setAttribute('href', stylesheetLocation);
}

/**
 * Loads a page.
 * @param {string} name The name of the page to load.
 * @param queryParams Optional queryParams
 */
function loadPage(name, queryParams) {
    if (name !== PAGES.header && name !== PAGES.footer) {
        togglePageStyle(name);
    }

    switch (name) {
        case PAGES.header:
            headerController();
            break;
        case PAGES.footer:
            footerController();
            break;
        case PAGES.overview:
            setCurrentPage(name, queryParams);
            overviewController();
            break;
        default:
            return false;
    }
    return true;
}

/**
 * Handles loading a page from the URL.
 * @param {string} fallback The page to fall back to if loading the page from the URL fails to load.
 */
function loadPageFromURL(fallback) {
    const currentPage = getCurrentPage();
    const queryParams = getQueryParams();

    if (currentPage && loadPage(currentPage, queryParams)) {
        return;
    }
    loadPage(fallback);
}

/** Handles initializing the application. */
function initializeApp() {
    // Always load the header and footer
    loadPage(PAGES.header);
    loadPage(PAGES.footer);

    // Attempt to load the page from the URL, otherwise fallback to the home page.
    loadPageFromURL(PAGES.overview);
}

window.addEventListener('load', () => initializeApp());
