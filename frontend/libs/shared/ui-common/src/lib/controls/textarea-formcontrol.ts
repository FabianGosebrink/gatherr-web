import { Component, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'workspace-text-field',
  template: '',
  // template: '<ngx-wig [content]="value"></ngx-wig>',
})
export class TextFieldComponent {
  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  val = '';

  set value(val) {
    if (val !== undefined && this.val !== val) {
      this.val = val;
    }
  }

  //ControlValueAccessor interface
  writeValue(obj: any) {}

  registerOnChange(fn: any) {}

  registerOnTouched(fn: any) {}

  setDisabledState?(isDisabled: boolean) {}
}
