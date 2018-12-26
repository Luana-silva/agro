import {FormGroup, FormControl} from '@angular/forms';

export class FormUtils {

  public constructor(private form: FormGroup) {
    this.form = form;

  }

  // form errors methods
  public fieldClassForErrorOrSuccess(fieldName: string) {
    return {
      'has-error': this.showFieldErrors(fieldName),
      'has-success': this.getField(fieldName),
    };
  }

  public iconClassForErrorOrSuccess(fieldName: string) {
    return {
      'has-error': this.showFieldErrors(fieldName),
      'has-success': this.getField(fieldName),
    };
  }

  public showFieldErrors(filedName): boolean {
    let field = this.getField(filedName);
    return !field.valid && (field.dirty || field.touched);
  }

  public getField(fieldName: string) {
    return this.form.get(fieldName);

  }

  public validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      // console.log(field);
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  public reset() {
    this.form.reset();
  }

}
