import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostcentreDetailComponent } from './costcentre-detail.component';

describe('CostcentreDetailComponent', () => {
  let component: CostcentreDetailComponent;
  let fixture: ComponentFixture<CostcentreDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostcentreDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostcentreDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
