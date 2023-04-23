import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListClinicsComponent } from './list-clinics.component';

describe('ListTodosComponent', () => {
  let component: ListClinicsComponent;
  let fixture: ComponentFixture<ListClinicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListClinicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListClinicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
