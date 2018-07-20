import { FormControl } from '@angular/forms';
import { validateJSON } from './json-metadata.validators';

fdescribe('#EditorModule `jsonMetadata` field custom validators', () => {
  fdescribe('validateJSON', () => {
    it('should return null if control value is a valid JSON', () => {
      const control = new FormControl('{"app":"steeditor/0.1.0"}');

      const result = validateJSON(control);

      expect(result).toEqual(null);
    });

    it('should return null if control value is an empty string', () => {
      const control = new FormControl('');

      const result = validateJSON(control);

      expect(result).toEqual(null);
    });

    it('should return object with `invalidJson` property equal true if control value is NOT a valid JSON', () => {
      const control = new FormControl('invalid json');

      const result = validateJSON(control);

      expect(result).toEqual({ invalidJson: true });
    });
  });
});
