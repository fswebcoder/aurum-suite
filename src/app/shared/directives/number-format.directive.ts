import { Directive, ElementRef, HostListener, model, OnInit, output } from '@angular/core';

@Directive({
  selector: '[sviNumberFormat]',
  standalone: true
})
export class NumberFormatDirective  {
  // Signal para el valor
  value = model<number | null>(null);

  // Output para eventos
  valueChange = output<number | null>();

  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/[^0-9]/g, '');

    if (!value) {
      this.value.set(null);
      this.valueChange.emit(null);
      input.value = '';
      return;
    }

    // Convertir a número decimal, interpretando los dos últimos dígitos como decimales
    let numericValue: number;
    if (value.length === 1) {
      numericValue = parseFloat('0.0' + value);
    } else if (value.length === 2) {
      numericValue = parseFloat('0.' + value);
    } else {
      numericValue = parseFloat(value.slice(0, value.length - 2) + '.' + value.slice(-2));
    }

    this.value.set(numericValue);
    this.valueChange.emit(numericValue);

    // Formatear con separador de miles y dos decimales
    input.value = this.formatExcelNumber(numericValue);
  }

  @HostListener('focus', ['$event'])
  onFocus(event: FocusEvent): void {
    // No hacemos nada especial al enfocar, para evitar confusión al usuario
  }

  @HostListener('blur', ['$event'])
  onBlur(event: FocusEvent): void {
    const input = event.target as HTMLInputElement;
    if (this.value() !== null && this.value() !== undefined && !isNaN(this.value()!)) {
      input.value = this.formatExcelNumber(this.value()!);
    } else {
      input.value = '';
    }
  }

  /**
   * Formatea el número al estilo Excel: separador de miles (coma), punto decimal, dos decimales.
   * @param value Número a formatear
   * @returns string con formato tipo Excel
   */
  private formatExcelNumber(value: number): string {
    if (value === null || value === undefined || isNaN(value)) {
      return '';
    }
    return value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'Home', 'End'];
    if ((event.ctrlKey || event.metaKey) && ['a', 'c', 'v', 'x'].includes(event.key.toLowerCase())) {
      return;
    }
    if (event.key.includes('Arrow')) {
      return;
    }
    if (/[0-9]/.test(event.key)) {
      return;
    }
    // Bloquear punto decimal, ya que el usuario no debe escribirlo manualmente
    if (event.key === '.') {
      event.preventDefault();
      return;
    }
    if (!allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }
}
