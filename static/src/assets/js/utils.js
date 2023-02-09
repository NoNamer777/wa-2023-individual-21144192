const parser = new DOMParser();

async function fetchTemplate(page) {
    const template = await (await fetch(`templates/${page}.html`)).text();

    return parser.parseFromString(template, 'text/html').body.firstChild;
}

function capitalize(input) {
    return input.slice(0, 1).toUpperCase() + input.slice(1);
}
