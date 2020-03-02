import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoluntarioListComponent } from './voluntario-list.component';

describe('VoluntarioListComponent', () => {
  let component: VoluntarioListComponent;
  let fixture: ComponentFixture<VoluntarioListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoluntarioListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoluntarioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
