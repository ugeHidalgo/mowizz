import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetDetailsComponent } from './budget-details.component';

describe('BudgetDetailsComponent', () => {
  let component: BudgetDetailsComponent;
  let fixture: ComponentFixture<BudgetDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
