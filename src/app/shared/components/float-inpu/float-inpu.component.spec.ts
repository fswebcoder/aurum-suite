import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatInpuComponent } from './float-inpu.component';

describe('FloatInpuComponent', () => {
  let component: FloatInpuComponent;
  let fixture: ComponentFixture<FloatInpuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloatInpuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FloatInpuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
