import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { EmptyDataIndicatorComponent } from './empty-data-indicator.component';

describe('EmptyDataIndicatorComponent', () => {
  let component: EmptyDataIndicatorComponent;
  let fixture: ComponentFixture<EmptyDataIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyDataIndicatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmptyDataIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
