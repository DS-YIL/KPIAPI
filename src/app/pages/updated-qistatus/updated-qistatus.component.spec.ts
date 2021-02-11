import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedQIStatusComponent } from './updated-qistatus.component';

describe('UpdatedQIStatusComponent', () => {
  let component: UpdatedQIStatusComponent;
  let fixture: ComponentFixture<UpdatedQIStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatedQIStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatedQIStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
