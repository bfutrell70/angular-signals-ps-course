import { Component, computed, effect, inject, linkedSignal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../product';
import { CurrencyPipe } from '@angular/common';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-selection',
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './product-selection.html',
  styleUrl: './product-selection.css'
})
export class ProductSelection {
  pageTitle = 'Product Selection';
  
  // best practice is to make service instance private
  // template should not access service directly
  private productService = inject(ProductService);

  selectedProduct = signal<Product | undefined>(undefined);
  // this resets the quantity to 1 when the selected product changes
  quantity = linkedSignal({
    source: this.selectedProduct,
    computation: p => 1
  });

  products = this.productService.productsResource.value;

  // using nullish coalescing operator '??'
  total = computed(() => (this.selectedProduct()?.price ?? 0) * this.quantity());
  color = computed(() => this.total() > 200 ? 'green' : 'blue');

  onDecrease(): void {
    // using a tertiary operator to return 0 if q is less than or equal to 0,
    // otherwise return q - 1
    this.quantity.update(q => q <= 0 ? 0 : q - 1);
  }

  onIncrease(): void {
    this.quantity.update(q => q + 1);
  }

  qtyEffect = effect(() => {
    console.log(this.quantity());
  })
}
