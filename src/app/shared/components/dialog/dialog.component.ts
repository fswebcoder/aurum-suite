import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'svi-dialog',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  @Input() visible: boolean = false;
  @Input() header: string = '';
  @Input() width: string = '50vw';
  @Input() modal: boolean = true;
  @Input() closable: boolean = true;
  @Input() closeOnEscape: boolean = true;
  @Input() dismissableMask: boolean = true;
  @Input() position: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright' = 'center';
  @Input() contentTemplate!: TemplateRef<any>;
  @Input() footerTemplate!: TemplateRef<any>;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() onHide = new EventEmitter<void>();

  hideDialog(): void {
    this.visible = false;
    this.visibleChange.emit(false);
    this.onHide.emit();
  }
}
