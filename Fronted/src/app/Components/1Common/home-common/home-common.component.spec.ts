import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCommonComponent } from './home-common.component';

describe('HomeCommonComponent', () => {
  let component: HomeCommonComponent;
  let fixture: ComponentFixture<HomeCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeCommonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
