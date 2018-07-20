import {
  validateWeightSum,
  validateQuantity,
  validateUniqueNames
} from './beneficiaries.validators';
import { FormArray, FormGroup, FormControl } from '@angular/forms';

fdescribe('#EditorModule `beneficiaries` field custom validators', () => {
  fdescribe('validateWeightSum', () => {
    it('should return null if sum of beneficiaries weights is less than 100', () => {
      const beneficiariesArray = new FormArray([
        new FormGroup({
          account: new FormControl('jakipatryk'),
          weight: new FormControl(30)
        }),
        new FormGroup({
          account: new FormControl('jakipatryk-dev'),
          weight: new FormControl(40)
        })
      ]);

      const result = validateWeightSum(beneficiariesArray);

      expect(result).toEqual(null);
    });

    it('should return an object with `tooHighWeight` property equal true if sum of beneficiaries weights is greater than 100', () => {
      const beneficiariesArray = new FormArray([
        new FormGroup({
          account: new FormControl('jakipatryk'),
          weight: new FormControl(30)
        }),
        new FormGroup({
          account: new FormControl('jakipatryk-dev'),
          weight: new FormControl(40)
        }),
        new FormGroup({
          account: new FormControl('jakipatryk-pl'),
          weight: new FormControl(40)
        })
      ]);

      const result = validateWeightSum(beneficiariesArray);

      expect(result).toEqual({ tooHighWeight: true });
    });
  });

  fdescribe('validateQuantity', () => {
    it('should return null if number of beneficiaries is lower of equal 8', () => {
      const beneficiariesArray = new FormArray([
        new FormGroup({
          account: new FormControl('jakipatryk'),
          weight: new FormControl(1)
        }),
        new FormGroup({
          account: new FormControl('noisy'),
          weight: new FormControl(1)
        }),
        new FormGroup({
          account: new FormControl('jacekw'),
          weight: new FormControl(1)
        }),
        new FormGroup({
          account: new FormControl('rafalski'),
          weight: new FormControl(1)
        }),
        new FormGroup({
          account: new FormControl('fervi'),
          weight: new FormControl(1)
        }),
        new FormGroup({
          account: new FormControl('saunter'),
          weight: new FormControl(1)
        }),
        new FormGroup({
          account: new FormControl('jakipatryk-dev'),
          weight: new FormControl(1)
        })
      ]);

      const resultWith7 = validateQuantity(beneficiariesArray);
      expect(resultWith7).toEqual(null);

      beneficiariesArray.push(
        new FormGroup({
          account: new FormControl('mkcafe'),
          weight: new FormControl(1)
        })
      );
      const resultWith8 = validateQuantity(beneficiariesArray);
      expect(resultWith8).toEqual(null);
    });

    it('should return an object with `tooManyBeneficiaries` property equal true if there are more than 8 beneficiaries', () => {
      const beneficiariesArray = new FormArray([
        new FormGroup({
          account: new FormControl('jakipatryk'),
          weight: new FormControl(1)
        }),
        new FormGroup({
          account: new FormControl('noisy'),
          weight: new FormControl(1)
        }),
        new FormGroup({
          account: new FormControl('jacekw'),
          weight: new FormControl(1)
        }),
        new FormGroup({
          account: new FormControl('rafalski'),
          weight: new FormControl(1)
        }),
        new FormGroup({
          account: new FormControl('fervi'),
          weight: new FormControl(1)
        }),
        new FormGroup({
          account: new FormControl('saunter'),
          weight: new FormControl(1)
        }),
        new FormGroup({
          account: new FormControl('mkcafe'),
          weight: new FormControl(1)
        }),
        new FormGroup({
          account: new FormControl('nicniezgrublem'),
          weight: new FormControl(1)
        }),
        new FormGroup({
          account: new FormControl('jakipatryk-dev'),
          weight: new FormControl(1)
        })
      ]);

      const result = validateQuantity(beneficiariesArray);

      expect(result).toEqual({ tooManyBeneficiaries: true });
    });
  });

  fdescribe('validateUniqueNames', () => {
    it('should return null if all beneficiaries names are unique', () => {
      const beneficiariesArray = new FormArray([
        new FormGroup({
          account: new FormControl('jakipatryk'),
          weight: new FormControl(30)
        }),
        new FormGroup({
          account: new FormControl('jakipatryk-dev'),
          weight: new FormControl(40)
        }),
        new FormGroup({
          account: new FormControl('mkcafe'),
          weight: new FormControl(10)
        })
      ]);

      const result = validateUniqueNames(beneficiariesArray);

      expect(result).toEqual(null);
    });

    it('should ignore controls with empty `account` property in their value', () => {
      const beneficiariesArray = new FormArray([
        new FormGroup({
          account: new FormControl('jakipatryk'),
          weight: new FormControl(30)
        }),
        new FormGroup({
          account: new FormControl('jakipatryk-dev'),
          weight: new FormControl(40)
        }),
        new FormGroup({
          account: new FormControl(''),
          weight: new FormControl(10)
        }),
        new FormGroup({
          account: new FormControl(''),
          weight: new FormControl(10)
        }),
        new FormGroup({
          account: new FormControl(''),
          weight: new FormControl(10)
        })
      ]);

      const result = validateUniqueNames(beneficiariesArray);

      expect(result).toEqual(null);
    });

    it('should return an object with `notUniqueNames` property equal true if not all names are unique', () => {
      const beneficiariesArray = new FormArray([
        new FormGroup({
          account: new FormControl('jakipatryk'),
          weight: new FormControl(30)
        }),
        new FormGroup({
          account: new FormControl('jakipatryk-dev'),
          weight: new FormControl(40)
        }),
        new FormGroup({
          account: new FormControl('jakipatryk'),
          weight: new FormControl(10)
        })
      ]);

      const result = validateUniqueNames(beneficiariesArray);

      expect(result).toEqual({ notUniqueNames: true });
    });
  });
});
