import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostcentresComponent } from './costcentres.component';

describe('CostcentresComponent', () => {
  let component: CostcentresComponent;
  let fixture: ComponentFixture<CostcentresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostcentresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostcentresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
