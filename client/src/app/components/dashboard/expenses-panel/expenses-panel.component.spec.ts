import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesPanelComponent } from './expenses-panel.component';

describe('ExpensesPanelComponent', () => {
  let component: ExpensesPanelComponent;
  let fixture: ComponentFixture<ExpensesPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensesPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
