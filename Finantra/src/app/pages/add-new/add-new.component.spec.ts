import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewComponent } from '../home/add-new/add-new.component';

describe('AddNewComponent', () => {
  let component: AddNewComponent;
  let fixture: ComponentFixture<AddNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
