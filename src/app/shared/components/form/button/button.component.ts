import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

type ButtonSeverity = 'primary' | 'secondary' | 'success' | 'info' | 'warn' | 'help' | 'danger' | 'contrast' | null;
type ButtonIconPosition = 'left' | 'right' | 'top' | 'bottom';
type ButtonType = 'button' | 'submit' | 'reset';


@Component({
  selector: 'svi-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: true,
  imports: [CommonModule, ButtonModule, RippleModule]
})
export class ButtonComponent {
  @Input() label?: string;
  @Input() icon?: string; // Para iconos de PrimeNG
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;
  @Input() severity?: ButtonSeverity;
  @Input() rounded: boolean = false;
  @Input() raised: boolean = false;
  @Input() outlined: boolean = false;
  @Input() text: boolean = false;
  @Input() size?: 'small' | 'large';
  @Input() iconPos?: ButtonIconPosition = 'left';
  @Input() styleClass?: string = 'custom-button';
  @Input() badge?: string;
  @Input() badgeClass?: string;
  @Input() type: ButtonType = 'button';
  @Input() fullWidth: boolean = false;

  @Output() onClick = new EventEmitter<any>();

  get buttonClass(): string {
    return `${this.styleClass} ${this.fullWidth ? 'w-full' : ''}`.trim();
  }

  handleClick(event: any) {
    if (!this.disabled && !this.loading) {
      this.onClick.emit(event);
    }
  }
}
