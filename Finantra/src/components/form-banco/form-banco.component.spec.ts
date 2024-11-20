import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBancoComponent } from './form-banco.component';

describe('FormBancoComponent', () => {
  let component: FormBancoComponent;
  let fixture: ComponentFixture<FormBancoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormBancoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormBancoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
