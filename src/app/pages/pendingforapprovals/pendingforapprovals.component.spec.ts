import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingforapprovalsComponent } from './pendingforapprovals.component';

describe('PendingforapprovalsComponent', () => {
  let component: PendingforapprovalsComponent;
  let fixture: ComponentFixture<PendingforapprovalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingforapprovalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingforapprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
