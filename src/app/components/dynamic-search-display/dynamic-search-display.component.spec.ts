import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicSearchDisplayComponent } from './dynamic-search-display.component';

describe('DynamicSearchDisplayComponent', () => {
  let component: DynamicSearchDisplayComponent;
  let fixture: ComponentFixture<DynamicSearchDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicSearchDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicSearchDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
