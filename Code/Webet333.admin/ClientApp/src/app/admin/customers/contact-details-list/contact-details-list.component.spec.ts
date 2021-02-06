import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDetailsListComponent } from './contact-details-list.component';

describe('ContactDetailsListComponent', () => {
  let component: ContactDetailsListComponent;
  let fixture: ComponentFixture<ContactDetailsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactDetailsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDetailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
