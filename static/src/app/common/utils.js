const parser = new DOMParser();

/** Fetches an HTML file and extracts the contents of it. */
async function fetchTemplate(location) {
    const template = await (await fetch(`${location}.html`)).text();

    return parser.parseFromString(template, 'text/html').body.firstChild;
}

/** Fetches a JSON file. */
async function fetchJsonFile(location) {
    return await (await fetch(`${location}.json`)).json();
}

/** Capitalizes a string. */
function capitalize(input) {
    return input.slice(0, 1).toUpperCase() + input.slice(1);
}
