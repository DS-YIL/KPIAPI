import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestedkpistatusComponent } from './requestedkpistatus.component';

describe('RequestedkpistatusComponent', () => {
  let component: RequestedkpistatusComponent;
  let fixture: ComponentFixture<RequestedkpistatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestedkpistatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestedkpistatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
