import { AbstractControl } from '@angular/forms';

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

/**
 * Validates a JSON from a form control.
 * @returns {null | object} null if JSON is valid, otherwise object with `invalidJson: true` property
 */
export const validateJSON = (control: AbstractControl): null | object => {
  try {
    JSON.parse(control.value);
    return null;
  } catch (err) {
    return control.value
      ? {
          invalidJson: true
        }
      : null;
  }
};

/**
 * A RegExp pattern for a URL.
 */
// tslint:disable-next-line:max-line-length
export const urlPattern: RegExp = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
