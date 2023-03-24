// /users/:id

export function buildRoutePath(path) {
    const routeParametersRegex = /:([a-zA-Z]+)/g
    const pathWithParama = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')

    // console.log(Array.from(path.matchAll(routeParametersRegex)))

    const pathRegex = new RegExp(`^${pathWithParama}(?<query>\\?(.*))?$`)

    return pathRegex
}