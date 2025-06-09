import { DatePikerComponent } from '@/shared/components/form/date-piker/date-piker.component';
import { FloatInputComponent } from '@/shared/components/form/float-input/float-input.component';
import { FloatSelectComponent } from '@/shared/components/form/float-select/float-select.component';
import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'svi-reception-sample-dump',
  imports: [ReactiveFormsModule, FloatInputComponent, DatePikerComponent, FloatSelectComponent],
  templateUrl: './reception-sample-dump.component.html',
  styleUrl: './reception-sample-dump.component.scss'
})
export class ReceptionSampleDumpComponent {
    form!: FormGroup;
    formBuilder = inject(FormBuilder);

    mockSuppliers = [
        { label: 'Proveedor 1', value: 1 },
        { label: 'Proveedor 2', value: 2 },
        { label: 'Proveedor 3', value: 3 },
    ];
    constructor() {
        this.createForm();
    }

    createForm() {
        this.form = this.formBuilder.group({
            receptionDate: new FormControl({ value: new Date(), disabled: true }),
            deliveryNumber: new FormControl(null, [Validators.required]),
            supplier: new FormControl(null, [Validators.required]),
        });
    }
}
