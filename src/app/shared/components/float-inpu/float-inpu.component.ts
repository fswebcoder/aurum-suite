import { Component, forwardRef, Input } from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-float-inpu',
    standalone: true,
    imports: [FloatLabelModule, InputTextModule, IconFieldModule, InputIconModule],
    templateUrl: './float-inpu.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FloatInpuComponent),
            multi: true
        }
    ]
})
export class FloatInpuComponent implements ControlValueAccessor {
    value: string = '';
    id: string = '';
    private _label: string = '';
    @Input() set label(value: string) {
        this._label = value;
    }

    private _icon: string = '';
    @Input() set icon(value: string) {
        this._icon = value;
    }

    private _disabled: boolean = false;
    @Input() set disabled(value: boolean) {
        this._disabled = value;
    }

    private _type: string = 'text';
    @Input() set type(value: string) {
        this._type = value;
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

    onInputChange(event: Event): void {
        const value = (event.target as HTMLInputElement).value;
        this.value = value;
        this.onChange(value);
        this.onTouched();
    }

    ngOnInit(): void {
        this.id = 'float-inpu-' + Math.random().toString(36).substr(2, 9);
    }

    get label(): string {
        return this._label;
    }

    get icon(): string {
        return this._icon;
    }

    get disabled(): boolean {
        return this._disabled;
    }

    get type(): string {
        return this._type;
    }
}
