import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KpieditrequestComponent } from './kpieditrequest.component';

describe('KpieditrequestComponent', () => {
  let component: KpieditrequestComponent;
  let fixture: ComponentFixture<KpieditrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KpieditrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KpieditrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
