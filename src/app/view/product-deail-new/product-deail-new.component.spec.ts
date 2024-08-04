import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDeailNewComponent } from './product-deail-new.component';

describe('ProductDeailNewComponent', () => {
  let component: ProductDeailNewComponent;
  let fixture: ComponentFixture<ProductDeailNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDeailNewComponent]
    });
    fixture = TestBed.createComponent(ProductDeailNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
