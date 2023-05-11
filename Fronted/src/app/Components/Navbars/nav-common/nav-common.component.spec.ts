import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavCommonComponent } from './nav-common.component';

describe('NavCommonComponent', () => {
  let component: NavCommonComponent;
  let fixture: ComponentFixture<NavCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavCommonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
