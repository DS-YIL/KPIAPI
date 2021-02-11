import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedmonthlykpisComponent } from './approvedmonthlykpis.component';

describe('ApprovedmonthlykpisComponent', () => {
  let component: ApprovedmonthlykpisComponent;
  let fixture: ComponentFixture<ApprovedmonthlykpisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedmonthlykpisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedmonthlykpisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
