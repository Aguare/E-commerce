import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductsApproveComponent } from './list-products-approve.component';

describe('ListProductsApproveComponent', () => {
  let component: ListProductsApproveComponent;
  let fixture: ComponentFixture<ListProductsApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProductsApproveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProductsApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
