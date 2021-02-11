import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlykpistatusComponent } from './monthlykpistatus.component';

describe('MonthlykpistatusComponent', () => {
  let component: MonthlykpistatusComponent;
  let fixture: ComponentFixture<MonthlykpistatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlykpistatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlykpistatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
