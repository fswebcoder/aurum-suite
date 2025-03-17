import { ButtonSeverity } from '@/shared/types/button.type';
import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, ContentChild, ContentChildren, EventEmitter, Input, Output, QueryList, TemplateRef } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-button',
    imports: [CommonModule, ButtonModule],
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss'
})
export class ButtonComponent implements AfterContentInit {
    iconTemplate?: TemplateRef<any>;
    @ContentChildren(TemplateRef) templates!: QueryList<TemplateRef<any>>; // Captura todos los ng-templates

    private _label: string = '';
    @Input() set label(value: string) {
        this._label = value;
    }

    private _severity: ButtonSeverity = 'primary';
    @Input() set severity(value: ButtonSeverity) {
        this._severity = value;
    }

    private _disabled: boolean = false;
    @Input() set disabled(value: boolean) {
        this._disabled = value;
    }

    @Output() onClick: EventEmitter<void> = new EventEmitter<void>();

    ngAfterContentInit() {
        this.iconTemplate = this.templates.first;
    }

    get label() {
        return this._label;
    }

    get severity() {
        return this._severity;
    }

    get disabled() {
        return this._disabled;
    }
}
