/**
 * https://gist.github.com/Dyljyn/59e95fbe09a24b1835667a1a5e401e5a
 */

import {
  Directive,
  EventEmitter,
  InjectFlags,
  Injector,
  OnDestroy,
  OnInit,
  Type
} from '@angular/core';
import {
  AbstractControl,
  FormControlDirective,
  FormControlName
} from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

const formDirectives = [FormControlName, FormControlDirective];

@Directive({
  selector: '[appSyncControl]'
})
export class SyncControlDirective implements OnInit, OnDestroy {
  private readonly directiveDestroyed$ = new EventEmitter<void>();

  constructor(private injector: Injector) {}

  ngOnDestroy() {
    this.directiveDestroyed$.emit();
    this.directiveDestroyed$.complete();
  }

  ngOnInit() {
    const control = this.getControl();

    if (!control) {
      return;
    }

    control.valueChanges
      .pipe(takeUntil(this.directiveDestroyed$))
      .subscribe(value => {
        control.setValue(value, { emitEvent: false });
      });
  }

  getControl(): AbstractControl {
    let foundDirective;

    for (const directive of formDirectives) {
      foundDirective = this.getDirective(directive);

      if (foundDirective) {
        return foundDirective.control;
      }
    }

    return undefined;
  }

  private getDirective<T extends Type<any>>(directive: T): T | undefined {
    return (
      this.injector.get(
        directive,
        // setting 'notFoundValue' to 'undefined' will make the method throw an error
        null,
        // tslint:disable-next-line:no-bitwise
        InjectFlags.Optional | InjectFlags.Self
      ) || undefined
    );
  }
}
