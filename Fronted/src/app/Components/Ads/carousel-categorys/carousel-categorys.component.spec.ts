import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselCategorysComponent } from './carousel-categorys.component';

describe('CarouselCategorysComponent', () => {
  let component: CarouselCategorysComponent;
  let fixture: ComponentFixture<CarouselCategorysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselCategorysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselCategorysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
