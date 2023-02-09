/**
 * Loads a page.
 * @param name The name of the page to load.
 */
function loadPage(name) {
    switch (name) {
        case PAGES.header:
            headerController();
            break;
        default:
            return false;
    }
    return true;
}

/** Handles initializing the application. */
function initializeApp() {
    // Always load the header
    loadPage(PAGES.header);
}

window.addEventListener('load', () => initializeApp());
