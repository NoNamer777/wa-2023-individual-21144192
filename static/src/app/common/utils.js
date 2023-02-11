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

/** Creates a query param string from an object for the URL. */
function stringifyQueryParams(queryParams) {
    if (JSON.stringify(queryParams) === '{}') return '';

    const keys = Object.keys(queryParams);
    let queryParamString = '?';

    Object.entries(queryParams).forEach(([key, value]) => {
        const isLast = keys[keys.length - 1] === key;

        queryParamString += `${key}=${value}`;

        if (!isLast) {
            queryParamString += '&';
        }
    });
    return queryParamString;
}

/** Extracts the query params from the URL. Returns an empty object if there are no query params set in the current route. */
function getQueryParams() {
    const queryParams = location.href.split('?')[1];
    const params = {};

    if (!queryParams) return params;

    for (const param of queryParams.split('&')) {
        const [key, value] = param.split('=');

        params[key] = value;
    }
    return params;
}

/** Gets the value of a particular query param. Returns undefined if the query param does not exist. */
function getQueryParam(param) {
    const queryParams = getQueryParams();

    return JSON.stringify(queryParams) === '{}' ? undefined : queryParams[param];
}
