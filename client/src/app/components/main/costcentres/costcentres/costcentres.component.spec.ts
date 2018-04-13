import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCentresComponent } from './costcentres.component';

describe('CostcentresComponent', () => {
  let component: CostCentresComponent;
  let fixture: ComponentFixture<CostCentresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostCentresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostCentresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
