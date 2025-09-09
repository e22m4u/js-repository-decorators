/**
 * Утилита извлекает массив кортежей, содержащий
 * ключи и значения полученного Map.
 *
 * @param map
 */
export declare function mapEntries<K, V>(map: Map<K, V> | undefined): [K, V][] | undefined;
