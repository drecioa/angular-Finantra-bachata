import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionMainPageComponent } from './session-main-page.component';

describe('SessionMainPageComponent', () => {
  let component: SessionMainPageComponent;
  let fixture: ComponentFixture<SessionMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionMainPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
