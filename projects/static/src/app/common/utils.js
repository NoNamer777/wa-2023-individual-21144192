const parser = new DOMParser();

/** Fetches an HTML file and extracts the contents of it. */
async function fetchTemplate(location) {
    const template = await (await fetch(`${location}.html`)).text();

    return parser.parseFromString(template, 'text/html').body.firstChild;
}

async function fetchSVG(location) {
    const file = await (await fetch(`${location}.svg`)).text();

    return parser.parseFromString(file, 'image/svg+xml').firstChild;
}

/** Fetches a JSON file. */
async function fetchJsonFile(location) {
    return await (await fetch(`${location}.json`)).json();
}

/** Capitalizes a string. */
function capitalize(input) {
    return input.slice(0, 1).toUpperCase() + input.slice(1);
}

function findParentElement(childElem, tagName) {
    while (childElem !== null && childElem !== undefined) {
        if (childElem.tagName === tagName) return childElem;

        childElem = childElem.parentElement;
    }
    return null;
}

function elemHasClass(elem, className) {
    return elem.classList.contains(className);
}

function addClass(elem, className) {
    elem.classList.add(className);
}

function removeClass(elem, className) {
    elem.classList.remove(className);
}
