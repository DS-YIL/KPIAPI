import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedkpiaprrovalformComponent } from './updatedkpiaprrovalform.component';

describe('UpdatedkpiaprrovalformComponent', () => {
  let component: UpdatedkpiaprrovalformComponent;
  let fixture: ComponentFixture<UpdatedkpiaprrovalformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatedkpiaprrovalformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatedkpiaprrovalformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
