import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingkpiapprovalsComponent } from './pendingkpiapprovals.component';

describe('PendingkpiapprovalsComponent', () => {
  let component: PendingkpiapprovalsComponent;
  let fixture: ComponentFixture<PendingkpiapprovalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingkpiapprovalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingkpiapprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
