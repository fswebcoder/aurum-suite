import { CommonModule } from '@angular/common';
import { Component, computed, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'svi-float-select',
  standalone: true,
  imports: [CommonModule, FloatLabelModule, SelectModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FloatSelectComponent),
      multi: true
    }
  ],
  templateUrl: './float-select.component.html',
  styleUrl: './float-select.component.scss',
  host: {
    class: 'w-full'
  }
})
export class FloatSelectComponent implements ControlValueAccessor {
  readonly id = `float-select-${crypto.randomUUID()}`;

  value: any = null;
  disabled = false;
  touched = false;

  // Inputs como signals
  label = input<string>('');
  options = input<any[]>([]);
  optionLabel = input<string>('label');
  optionValue = input<string | undefined>(undefined);
  showClear = input<boolean>(false);
  filter = input<boolean>(false);
  filterBy = input<string>('label');
  emptyFilterMessage = input<string>('No se encontraron resultados');
  emptyMessage = input<string>('No hay opciones disponibles');
  errorMessages = input<Record<string, string>>({});

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onBlur() {
    this.touched = true;
    this.onTouched();
  }

  // Computed properties para manejo de errores
  hasErrors = computed(() => {
    return this.touched && !this.value;
  });

  errorMessage = computed(() => {
    const errorMessages = this.errorMessages();
    if (this.hasErrors()) {
      if (errorMessages['required']) {
        return errorMessages['required'];
      }
      return `El campo ${this.label()?.toLowerCase()} es requerido`;
    }
    return '';
  });
}
