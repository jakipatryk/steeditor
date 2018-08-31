import { FormControl } from '@angular/forms';
import {
  validateSegmentEndsWithWrongChar,
  validateSegmentStartsWithWrongChar,
  validateSegmentTooShort,
  validateSegmentWithWrongChars,
  validateTooManyDashesInRow
} from './steem-account-name.validators';

fdescribe('#EditorModule Steem account name validators', () => {
  fdescribe('validateSegmentStartsWithWrongChar', () => {
    it('should return `{segmentStartsWithWrongChar: true}` if any of segments of control value (name) starts with invalid char', () => {
      const control = new FormControl('seg1.seg2.9isinvalid');

      const result = validateSegmentStartsWithWrongChar(control);

      expect(result).toEqual({ segmentStartsWithWrongChar: true });
    });

    it('should return `null` if each segment of control value (name) starts with a correct letter', () => {
      const control = new FormControl('seg1.seg2.seg3');

      const result = validateSegmentStartsWithWrongChar(control);

      expect(result).toEqual(null);
    });
  });

  fdescribe('validateSegmentEndsWithWrongChar', () => {
    it('should return `{segmentEndsWithWrongChar: true}` if any of segments of control value (name) ends with invalid char', () => {
      const control = new FormControl('seg1.seg2.isinvalid-');

      const result = validateSegmentEndsWithWrongChar(control);

      expect(result).toEqual({ segmentEndsWithWrongChar: true });
    });

    it('should return `null` if each segment of control value (name) ends with a correct letter', () => {
      const control = new FormControl('seg1.seg2.seg3');

      const result = validateSegmentEndsWithWrongChar(control);

      expect(result).toEqual(null);
    });
  });

  fdescribe('validateSegmentWithWrongChars', () => {
    it('should return `{segmentWithWrongChars: true}` if any of segments of control value (name) contains invalid char', () => {
      const control = new FormControl('seg1.seg2.is&invalid');

      const result = validateSegmentWithWrongChars(control);

      expect(result).toEqual({ segmentWithWrongChars: true });
    });

    it('should return `null` if each segment of control value (name) ends with a correct letter', () => {
      const control = new FormControl('seg1.seg2.seg3');

      const result = validateSegmentWithWrongChars(control);

      expect(result).toEqual(null);
    });
  });

  fdescribe('validateTooManyDashesInRow', () => {
    it('should return `{tooManyDashesInRow: true}` if control value (name) contains more than one dash in a row', () => {
      const control = new FormControl('seg1.seg2.is--invalid');

      const result = validateTooManyDashesInRow(control);

      expect(result).toEqual({ tooManyDashesInRow: true });
    });

    it('should return `null` if each segment of control value (name) does NOT contain more than one dash in a row', () => {
      const control = new FormControl('seg1.seg2.s-eg3');

      const result = validateTooManyDashesInRow(control);

      expect(result).toEqual(null);
    });
  });

  fdescribe('validateSegmentTooShort', () => {
    it('should return `{segmentTooShort: true}` if any segment of control value (name) is shorter than 3 chars', () => {
      const control = new FormControl('seg1.se.isinvalid');

      const result = validateSegmentTooShort(control);

      expect(result).toEqual({ segmentTooShort: true });
    });

    it('should return `null` if each segment of control value (name) is logner than or equal to 3 chars', () => {
      const control = new FormControl('seg1.seg.seg3');

      const result = validateSegmentTooShort(control);

      expect(result).toEqual(null);
    });
  });
});
