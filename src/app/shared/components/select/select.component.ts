import { Component, Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

@Component({
    selector: 'app-select',
    imports: [FloatLabelModule, InputTextModule, IconFieldModule, InputIconModule, SelectModule],
    templateUrl: './select.component.html',
    styleUrl: './select.component.scss'
})
export class SelectComponent implements ControlValueAccessor {
    value: string = '';
    id: string = '';

    private _label: string = '';
    @Input() set label(value: string) {
        console.log(value);
        this._label = value;
    }

    private _icon: string = '';
    @Input() set icon(value: string) {
        this._icon = value;
    }

    private _options: Array<object> = [];
    @Input() set options(value: Array<object>) {
        this._options = value;
    }

    private _disabled: boolean = false;
    @Input() set disabled(value: boolean) {
        this._disabled = value;
    }

    private _optionLabel: string = '';
    @Input() set optionLabel(value: string) {
        this._optionLabel = value;
    }

    private _showClear: boolean = false;
    @Input() set showClear(value: boolean) {
        this._showClear = value;
    }

    private _filter: boolean = false;
    @Input() set filter(value: boolean) {
        this._filter = value;
    }

    private onChange: (value: string) => void = () => {};
    private onTouched: () => void = () => {};

    writeValue(obj: any): void {
        if (obj !== undefined) {
            this.value = obj;
        }
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    get label() {
        return this._label;
    }

    get icon() {
        return this._icon;
    }

    get options() {
        return this._options;
    }

    get disabled() {
        return this._disabled;
    }

    get optionLabel() {
        return this._optionLabel;
    }

    get showClear() {
        return this._showClear;
    }

    get filter() {
        return this._filter;
    }
}
