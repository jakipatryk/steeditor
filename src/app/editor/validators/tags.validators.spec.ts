import { FormControl } from '@angular/forms';
import {
  validateNoCapitalLetters,
  validateNoSpecialChars,
  validateUnique
} from './tags.validators';

fdescribe('#EditorModule `tags` field custom validators', () => {
  fdescribe('validateNoCapitalLetters', () => {
    it('should return null if first tag does NOT contain capital letters', () => {
      const controlWithoutCapitalLetters = new FormControl([
        'tag1',
        'tag2',
        'tag-3',
        'tag4'
      ]);

      const result = validateNoCapitalLetters(controlWithoutCapitalLetters);

      expect(result).toEqual(null);
    });

    it('should return an object with `capitalLetters` property equal true if first tag contains capital letters', () => {
      const controlWithOnlyCapitalLetters = new FormControl([
        'TAG',
        'TAGG',
        'TAGGG',
        'TAGGGG'
      ]);
      const controlWithSomeCapitalLetters = new FormControl([
        'tAg1',
        'tag2',
        'tag3'
      ]);

      const resultOnlyCapitalLetters = validateNoCapitalLetters(
        controlWithOnlyCapitalLetters
      );
      const resultSomeCaptialLetters = validateNoCapitalLetters(
        controlWithSomeCapitalLetters
      );

      expect(resultOnlyCapitalLetters).toEqual({ capitalLetters: true });
      expect(resultSomeCaptialLetters).toEqual({ capitalLetters: true });
    });
  });

  fdescribe('validateNoSpecialChars', () => {
    it('should return null if the control value does NOT contain first tag with not allowed special chars', () => {
      const controlWihoutSpecialChars = new FormControl([
        'tag-1',
        'tag2',
        'tag3'
      ]);

      const result = validateNoSpecialChars(controlWihoutSpecialChars);

      expect(result).toEqual(null);
    });

    it('should return an object with `specialChars` property equal true if there are more than two dashes in first tag', () => {
      const controlWihSpecialChars = new FormControl([
        'ta-g-1',
        'tag2',
        'tag3'
      ]);

      const result = validateNoSpecialChars(controlWihSpecialChars);

      expect(result).toEqual({ specialChars: true });
    });

    it('should return an object with `specialChars` property equal true if first tag starts with a dash', () => {
      const controlOneTagStartsWithDash = new FormControl([
        '-tag1',
        'tag2',
        'tag3'
      ]);

      const result = validateNoSpecialChars(controlOneTagStartsWithDash);

      expect(result).toEqual({ specialChars: true });
    });

    it('should return an object with `specialChars` property equal true if there are more than one dashes in the first tag', () => {
      const controlWihTwoDashes = new FormControl(['ta-g-1', 'tag2', 'tag3']);

      const result = validateNoSpecialChars(controlWihTwoDashes);

      expect(result).toEqual({ specialChars: true });
    });

    it('should return an object with `specialChars` property equal true if there are any not allowed special chars in first tag', () => {
      const controlWihSpecialChars = new FormControl([
        'tag1&',
        '*tag2',
        'tag#3'
      ]);

      const result = validateNoSpecialChars(controlWihSpecialChars);

      expect(result).toEqual({ specialChars: true });
    });
  });

  fdescribe('validateUnique', () => {
    it('should return null if all tags from form control are unique', () => {
      const controlUnique = new FormControl(['tag1', 'tag2', 'tag3']);

      const result = validateUnique(controlUnique);

      expect(result).toEqual(null);
    });

    it('should return an object with `notUnique` property equal true if tags are not unique', () => {
      const controlNotUnique = new FormControl(['tag1', 'tag2', 'tag1']);

      const result = validateUnique(controlNotUnique);

      expect(result).toEqual({ notUnique: true });
    });
  });
});
