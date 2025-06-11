import { Component, input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatInputComponent } from '@/shared/components/form/float-input/float-input.component';
import { FloatSelectComponent } from '@/shared/components/form/float-select/float-select.component';
import { NumberFormatDirective } from '@/shared/directives/number-format.directive';

@Component({
  selector: 'svi-add-samples',
  standalone: true,
  imports: [ReactiveFormsModule, FloatInputComponent, FloatSelectComponent, NumberFormatDirective],
  templateUrl: './add-samples.component.html',
  styleUrl: './add-samples.component.scss'
})
export class AddSamplesComponent implements OnChanges {
  form!: FormGroup;
  resetForm = input<boolean>(false);
  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['resetForm'] && this.resetForm()) {
      this.createForm();
    }
  }

  createForm() {
    this.form = this.fb.group({
      sampleNumber: new FormControl(null, [Validators.required]),
      sampleType: new FormControl(null, [Validators.required]),
      sampleWeight: new FormControl(null, [Validators.required, Validators.min(0)])
    });
  }
}
