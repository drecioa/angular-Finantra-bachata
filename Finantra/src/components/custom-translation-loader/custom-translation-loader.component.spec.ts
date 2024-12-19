import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTranslationLoaderComponent } from './custom-translation-loader.component';

describe('CustomTranslationLoaderComponent', () => {
  let component: CustomTranslationLoaderComponent;
  let fixture: ComponentFixture<CustomTranslationLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomTranslationLoaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomTranslationLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
