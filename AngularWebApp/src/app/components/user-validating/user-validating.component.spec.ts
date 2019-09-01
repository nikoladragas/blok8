import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserValidatingComponent } from './user-validating.component';

describe('UserValidatingComponent', () => {
  let component: UserValidatingComponent;
  let fixture: ComponentFixture<UserValidatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserValidatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserValidatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
