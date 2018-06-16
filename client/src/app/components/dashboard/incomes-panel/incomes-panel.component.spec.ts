import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomesPanelComponent } from './incomes-panel.component';

describe('IncomesPanelComponent', () => {
  let component: IncomesPanelComponent;
  let fixture: ComponentFixture<IncomesPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomesPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
