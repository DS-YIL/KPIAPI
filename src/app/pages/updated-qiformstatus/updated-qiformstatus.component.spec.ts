import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedQIFormstatusComponent } from './updated-qiformstatus.component';

describe('UpdatedQIFormstatusComponent', () => {
  let component: UpdatedQIFormstatusComponent;
  let fixture: ComponentFixture<UpdatedQIFormstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatedQIFormstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatedQIFormstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
