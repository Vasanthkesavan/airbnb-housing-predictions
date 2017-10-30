import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceEstimaterComponent } from './price-estimater.component';

describe('PriceEstimaterComponent', () => {
  let component: PriceEstimaterComponent;
  let fixture: ComponentFixture<PriceEstimaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceEstimaterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceEstimaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
