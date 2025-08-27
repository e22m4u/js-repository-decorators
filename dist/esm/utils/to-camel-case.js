/**
 * To camel case.
 *
 * @param input
 */
export function toCamelCase(input) {
    if (!input)
        return '';
    const spacedString = input
        .replace(/([-_])/g, ' ')
        .replace(/([a-z])([A-Z])/g, '$1 $2');
    const intermediateCased = spacedString
        .toLowerCase()
        .replace(/\s(.)/g, $1 => $1.toUpperCase())
        .replace(/\s/g, '');
    if (!intermediateCased)
        return '';
    return intermediateCased.charAt(0).toLowerCase() + intermediateCased.slice(1);
}
