import {
  validateNoCapitalLetters,
  validateNoHashes,
  validateNoWhitespaces,
  validateUnique
} from './tags.validators';
import { FormControl } from '@angular/forms';

fdescribe('#EditorModule `tags` field custom validators', () => {
  fdescribe('validateNoCapitalLetters', () => {
    it('should return null if the control value does NOT contain capital letters', () => {
      const controlWithoutCapitalLetters = new FormControl([
        'tag1',
        'tag2',
        'tag-3',
        'tag4'
      ]);

      const result = validateNoCapitalLetters(controlWithoutCapitalLetters);

      expect(result).toEqual(null);
    });

    it('should return an object with `capitalLetters` property equal true if any tag contain capital letters', () => {
      const controlWithOnlyCapitalLetters = new FormControl([
        'TAG',
        'TAGG',
        'TAGGG',
        'TAGGGG'
      ]);
      const controlWithSomeCapitalLetters = new FormControl([
        'tag1',
        'tAg2',
        'Tag3'
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

  fdescribe('validateNoHashes', () => {
    it('should return null if the control value does NOT contain any hashes', () => {
      const controlWihoutHashes = new FormControl(['tag1', 'tag2', 'tag3']);

      const result = validateNoHashes(controlWihoutHashes);

      expect(result).toEqual(null);
    });

    it('should return an object with `hash` property equal true if there are any hashes in the tags', () => {
      const controlWithHashes = new FormControl(['#tag1', '#tag2', 'tag3']);

      const result = validateNoHashes(controlWithHashes);

      expect(result).toEqual({ hash: true });
    });
  });

  fdescribe('validateNoWhitespaces', () => {
    it('should return null if there are no whitespaces in tags', () => {
      const controlWithoutWhitespaces = new FormControl([
        'tag1',
        'tag2',
        'tag3'
      ]);

      const result = validateNoWhitespaces(controlWithoutWhitespaces);

      expect(result).toEqual(null);
    });

    it('should return an object with `whitespace` property equal true if there are any whitespaces in tags', () => {
      const controlWithSpaces = new FormControl(['tag 1', 'tag 2', 'tag3']);

      const result = validateNoWhitespaces(controlWithSpaces);

      expect(result).toEqual({ whitespace: true });
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
