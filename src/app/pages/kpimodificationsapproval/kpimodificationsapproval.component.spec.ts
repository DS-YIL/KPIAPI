import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KpimodificationsapprovalComponent } from './kpimodificationsapproval.component';

describe('KpimodificationsapprovalComponent', () => {
  let component: KpimodificationsapprovalComponent;
  let fixture: ComponentFixture<KpimodificationsapprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KpimodificationsapprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KpimodificationsapprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
