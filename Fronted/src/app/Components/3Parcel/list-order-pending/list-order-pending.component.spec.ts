import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrderPendingComponent } from './list-order-pending.component';

describe('ListOrderPendingComponent', () => {
  let component: ListOrderPendingComponent;
  let fixture: ComponentFixture<ListOrderPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOrderPendingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOrderPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
