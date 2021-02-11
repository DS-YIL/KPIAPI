import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatekpiComponent } from './createkpi.component';

describe('CreatekpiComponent', () => {
  let component: CreatekpiComponent;
  let fixture: ComponentFixture<CreatekpiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatekpiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatekpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
