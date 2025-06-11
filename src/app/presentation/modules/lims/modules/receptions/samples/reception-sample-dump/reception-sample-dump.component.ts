import { DialogComponent } from '@/shared/components/dialog/dialog.component';
import { ButtonComponent } from '@/shared/components/form/button/button.component';
import { DatePikerComponent } from '@/shared/components/form/date-piker/date-piker.component';
import { FloatInputComponent } from '@/shared/components/form/float-input/float-input.component';
import { FloatSelectComponent } from '@/shared/components/form/float-select/float-select.component';
import { TextAreaComponent } from '@/shared/components/form/text-area/text-area.component';
import { TableComponent } from '@/shared/components/table/table.component';
import { Component, inject, input, signal } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AddSamplesComponent } from '../components/add-samples/add-samples.component';
import { CommonModule } from '@angular/common';
import { IsupplierListResponseEntity } from '@/domain/entities/common/suppliers-list-response.entity';
import { IDepartmentsResponseEntity } from '@/domain/entities/common/departments-response.entity';

@Component({
  selector: 'svi-reception-sample-dump',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FloatInputComponent,
    DatePikerComponent,
    FloatSelectComponent,
    TableComponent,
    TextAreaComponent,
    ButtonComponent,
    DialogComponent,
    AddSamplesComponent
  ],
  templateUrl: './reception-sample-dump.component.html',
  styleUrl: './reception-sample-dump.component.scss'
})
export class ReceptionSampleDumpComponent {
  form!: FormGroup;
  formBuilder = inject(FormBuilder);
  visible = signal<boolean>(false);
  resetForm = signal<boolean>(false);
  loadingSupplier = input<boolean>(false);
  inputSuppliersList = input<IsupplierListResponseEntity[]>([]);
  departments = input<IDepartmentsResponseEntity[]>([]);
  mockSuppliers = [
    { label: 'Proveedor 1', value: 1 },
    { label: 'Proveedor 2', value: 2 },
    { label: 'Proveedor 3', value: 3 }
  ];

  columns = [
    { field: 'sampleNumber', header: 'Numero de muestra' },
    { field: 'sampleType', header: 'Tipo de muestra' },
    { field: 'sampleWeight', header: 'Peso de la muestra' },
    { field: 'sampleDate', header: 'Fecha de recepcion' }
  ];

  actions = [
    {
      icon: 'pi pi-trash',
      tooltip: 'Eliminar',
      action: (row: any) => {
        console.log(row);
      }
    }
  ];

  data = [
    { sampleNumber: '1', sampleType: 'Muestra 1', sampleWeight: 100, sampleDate: new Date() },
    { sampleNumber: '2', sampleType: 'Muestra 2', sampleWeight: 200, sampleDate: new Date() },
    { sampleNumber: '3', sampleType: 'Muestra 3', sampleWeight: 300, sampleDate: new Date() }
  ];

  constructor() {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      receptionDate: new FormControl({ value: new Date(), disabled: true }),
      deliveryNumber: new FormControl(null, [Validators.required]),
      supplier: new FormControl(null, [Validators.required]),
      department: new FormControl(null, [Validators.required]),
      municipality: new FormControl(null, [Validators.required]),
      observation: new FormControl(null)
    });
  }

  onHideDialog() {
    this.visible.set(false);
    this.resetForm.set(true);
  }
}
