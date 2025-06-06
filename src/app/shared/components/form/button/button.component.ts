import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { LoadingService } from '@/shared/services/loading.service';
import { Subscription } from 'rxjs';

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
export class ButtonComponent implements OnInit, OnDestroy {
  private loadingService = inject(LoadingService);
  private subscription?: Subscription;

  @Input() label?: string;
  @Input() icon?: string; // Para iconos de PrimeNG
  @Input() loading: boolean = false;
  @Input() set disabled(value: boolean) {
    this._originalDisabled = value;
    this._disabled = value;
  }
  get disabled(): boolean {
    return this._disabled;
  }
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
  @Input() loadingId?: string; // ID único para el estado de loading

  @Output() onClick = new EventEmitter<any>();

  private _originalDisabled: boolean = false;
  private _disabled: boolean = false;

  ngOnInit() {
    if (this.loadingId) {
      this.subscription = this.loadingService.isButtonLoading$(this.loadingId).subscribe(isLoading => {
        this.loading = isLoading;
        this._disabled = isLoading ? true : this._originalDisabled;
      });
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  get buttonClass(): string {
    return `${this.styleClass} ${this.fullWidth ? 'w-full' : ''}`.trim();
  }

  handleClick(event: any) {
    if (!this.disabled && !this.loading) {
      this.onClick.emit(event);
    }
  }
}
