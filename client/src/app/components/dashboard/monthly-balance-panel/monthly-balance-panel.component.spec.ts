import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyBalancePanelComponent } from './monthly-balance-panel.component';

describe('MonthlyBalancePanelComponent', () => {
  let component: MonthlyBalancePanelComponent;
  let fixture: ComponentFixture<MonthlyBalancePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyBalancePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyBalancePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
