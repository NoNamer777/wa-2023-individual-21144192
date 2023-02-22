/** Creates a query param string from an object for the URL. */
function stringifyQueryParams(queryParams) {
    if (!queryParams || JSON.stringify(queryParams) === '{}') return '';

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
function getQueryParams(input) {
    const queryParams = input;
    const params = {};

    if (!queryParams) return params;

    for (const param of queryParams.split('&')) {
        const [key, value] = param.split('=');

        params[key] = value;
    }
    return params;
}

/** Gets the value of a particular query param. Returns undefined if the query param does not exist. */
function getQueryParamFromRoute(param) {
    const queryParams = getQueryParams(location.href.split('?')[1]);

    return JSON.stringify(queryParams) === '{}' ? undefined : queryParams[param];
}

function setCurrentRoute(route, queryParams, preserveQueryParams = false) {
    if (!preserveQueryParams) {
        location.hash = '/' + route + stringifyQueryParams(queryParams);
        return;
    }
    const routeQueryParams = {
        ...getQueryParams(location.hash.split('?')[1]),
        ...queryParams,
    };
    location.hash = '/' + route + stringifyQueryParams(routeQueryParams);
}
