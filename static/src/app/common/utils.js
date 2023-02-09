const parser = new DOMParser();

async function fetchTemplate(location) {
    const template = await (await fetch(`${location}.html`)).text();

    return parser.parseFromString(template, 'text/html').body.firstChild;
}

function capitalize(input) {
    return input.slice(0, 1).toUpperCase() + input.slice(1);
}
