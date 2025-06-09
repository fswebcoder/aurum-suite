import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, computed, forwardRef, input } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator
} from '@angular/forms';
import { InputTransformFn, NgxMaskDirective, OutputTransformFn } from 'ngx-mask';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormErrorDirective } from '../../../directives/form-error.directive';

@Component({
  selector: 'svi-float-input',
  standalone: true,
  imports: [
    CommonModule,
    FloatLabelModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    NgxMaskDirective,
    ReactiveFormsModule,
    PasswordModule,
    FormErrorDirective
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FloatInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FloatInputComponent),
      multi: true
    }
  ],
  templateUrl: './float-input.component.html',
  host: {
    class: 'w-full p-floatlabel-on'
  }
})
export class FloatInputComponent implements ControlValueAccessor, Validator {
  readonly id = `float-input-${crypto.randomUUID()}`;

  control = new FormControl('');
  onTouchedFn = () => {};
  onChangeFn = (_: any) => {};

  icon = input<string>();
  label = input<string>();
  mask = input<string | null>(null);
  suffix = input<string>('');
  prefix = input<string>('');
  allowNegativeNumbers = input<boolean, any>(false, { transform: booleanAttribute });
  thousandSeparator = input<string>('.');
  decimalMarker = input<',' | '.' | ['.', ',']>(',');
  type = input<'text' | 'email' | 'password' | 'number'>('text');

  customOutputTransformFn = input<OutputTransformFn>((val: any) => val, { alias: 'outputTransformFn' });
  inputTransformFn = input<InputTransformFn>((val: any) => val);

  errorMessages = input<Record<string, string>>({});

  writeValue(obj: any): void {}

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  validate(control: FormControl): ValidationErrors | null {
    this.control = control;

    return control.touched && control.invalid ? control.errors : null;
  }

  get hasErrors(): boolean {
    return (this.control?.touched && this.control?.invalid) ?? false;
  }

  get errorMessage(): string {
    const errors = this.control?.errors;
    const errorMessages = this.errorMessages();

    if (errors) {
      for (const type in errors) {
        if (errorMessages[type]) {
          return errorMessages[type];
        }
      }
      return `El campo ${this.label()?.toLocaleLowerCase()} es invalido `;
    }
    return '';
  }

  outputTransformFn = computed<OutputTransformFn>(() => {
    const type = this.type();
    const customFn: OutputTransformFn = this.customOutputTransformFn();

    return (value: string | number | undefined | null) => {
      switch (type) {
        case 'number':
          if (typeof value === 'number') return customFn(value);
          if (typeof value === 'string' && value !== '') return customFn(Number(value));
          return null;
        case 'text':
          if (typeof value === 'number') return customFn(String(value));
          if (typeof value === 'string' && value !== '') return customFn(value);
          return null;
        default:
          return customFn(value);
      }
    };
  });
}
