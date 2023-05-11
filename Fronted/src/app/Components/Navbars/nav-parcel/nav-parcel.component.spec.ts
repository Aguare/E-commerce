import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavParcelComponent } from './nav-parcel.component';

describe('NavParcelComponent', () => {
  let component: NavParcelComponent;
  let fixture: ComponentFixture<NavParcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavParcelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavParcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
