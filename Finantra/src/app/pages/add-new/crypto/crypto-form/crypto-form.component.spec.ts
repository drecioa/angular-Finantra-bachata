import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoFormComponent } from './crypto-form.component';

describe('CryptoFormComponent', () => {
  let component: CryptoFormComponent;
  let fixture: ComponentFixture<CryptoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CryptoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CryptoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
