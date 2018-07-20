/**
 * Converts an array into entities.
 * @param arr An array you want to convert.
 * @param identifier The identifier you want to use as a key.
 * @returns Entities.
 * @example
 * makeEntities({name: 'google', body: 'test test', ranking: 40}, {name: 'yahoo', body: 'test 2', ranking: 90}, 'name');
 * // returns: { 'google': {name: 'google', body: 'test test', ranking: 40}, 'yahoo': {name: 'yahoo', body: 'test 2', ranking: 90} }
 */
export const makeEntities = <T>(
  arr: Array<T>,
  identifier: string
): { [identifier: string]: T } =>
  arr.reduce(
    (entities, current) => ({ ...entities, [current[identifier]]: current }),
    {}
  );

/**
 * Immutable way to delete an entity of given id.
 * @param entities The entities object from which you want to delete element.
 * @param id The id of entity to delete.
 * @returns Entities without the element of given id.
 * @example
 * deleteEntity({ 123: { ... }, 33: { ... } }, 33);
 * // { 123: { … } }
 */
export const deleteEntity = <T>(entities: T, id: string | number): T =>
  Object.keys(entities)
    .filter(currentId => currentId !== id.toString())
    .reduce(
      (newEntities, entityId) => {
        newEntities[entityId] = entities[entityId];
        return newEntities;
      },
      {} as T
    );
