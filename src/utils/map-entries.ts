/**
 * Утилита извлекает массив кортежей, содержащий
 * ключи и значения полученного Map.
 *
 * @param map
 */
export function mapEntries<K, V>(
  map: Map<K, V> | undefined,
): [K, V][] | undefined {
  if (!map) return;
  return Array.from(map.entries());
}
