/**
 * Loads a page.
 * @param name The name of the page to load.
 */
function loadPage(name) {
    switch (name) {
        case PAGES.header:
            headerController();
            break;
        case PAGES.footer:
            footerController();
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
