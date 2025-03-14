import { Component } from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-float-inpu',
  imports: [FloatLabelModule, InputTextModule],
  templateUrl: './float-inpu.component.html',
  styleUrl: './float-inpu.component.scss'
})
export class FloatInpuComponent {

}
