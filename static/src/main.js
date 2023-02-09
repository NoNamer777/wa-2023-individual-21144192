function setCurrentPage(name) {
    location.hash = name;
}

/**
 * Dynamically loads the style for the current page.
 * @param name The name of the page to load the styles for.
 */
function togglePageStyle(name) {
    const link = window.document.querySelector(`head link[href='']`);
    const stylesheetLocation = `./assets/styles/${name}.css`;

    if (!stylesheetLocation) {
        throw new Error(`Could not find the stylesheet for the current page. ('${name}')`);
    }
    link.setAttribute('href', stylesheetLocation);
}

/**
 * Loads a page.
 * @param name The name of the page to load.
 */
function loadPage(name) {
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
        case PAGES.home:
            setCurrentPage(name);
            homeController();
            break;
        default:
            return false;
    }
    return true;
}

/** Handles initializing the application. */
function initializeApp() {
    // Always load the header and footer
    loadPage(PAGES.header);
    loadPage(PAGES.footer);
}

window.addEventListener('load', () => initializeApp());
