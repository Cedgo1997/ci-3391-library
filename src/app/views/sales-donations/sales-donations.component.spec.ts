import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesDonationsComponent } from './sales-donations.component';

describe('SalesDonationsComponent', () => {
  let component: SalesDonationsComponent;
  let fixture: ComponentFixture<SalesDonationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesDonationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesDonationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
