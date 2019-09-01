import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketValidatingComponent } from './ticket-validating.component';

describe('TicketValidatingComponent', () => {
  let component: TicketValidatingComponent;
  let fixture: ComponentFixture<TicketValidatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketValidatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketValidatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
