import { FormControl } from '@angular/forms';
import { AlwaysMatcher } from './always.matcher';

fdescribe('#EditorModule AlwaysMatcher', () => {
  let matcher: AlwaysMatcher;
  let testControl: FormControl;

  beforeEach(() => {
    matcher = new AlwaysMatcher();
    testControl = new FormControl();
  });

  it('should match error when control is invalid', () => {
    let isErrorMatched: boolean;

    testControl.setErrors({ testError: true });
    isErrorMatched = matcher.isErrorState(testControl, null);

    expect(isErrorMatched).toBeTruthy();
  });

  it('should NOT match error when control is valid', () => {
    let isErrorMatched: boolean;

    testControl.setErrors(null);
    isErrorMatched = matcher.isErrorState(testControl, null);

    expect(isErrorMatched).toBeFalsy();
  });
});
