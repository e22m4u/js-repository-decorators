/**
 * Утилита извлекает массив кортежей, содержащий
 * ключи и значения полученного Map.
 *
 * @param map
 */
export function mapEntries(map) {
    if (!map)
        return;
    return Array.from(map.entries());
}
