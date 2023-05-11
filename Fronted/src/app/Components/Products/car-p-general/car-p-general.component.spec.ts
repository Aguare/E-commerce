import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarPGeneralComponent } from './car-p-general.component';

describe('CarPGeneralComponent', () => {
  let component: CarPGeneralComponent;
  let fixture: ComponentFixture<CarPGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarPGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarPGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
