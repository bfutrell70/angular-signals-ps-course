import { Component, computed, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../product';
import { ProductData } from '../product-data';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-selection',
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './product-selection.html',
  styleUrl: './product-selection.css'
})
export class ProductSelection {
  pageTitle = 'Product Selection';

  selectedProduct = signal<Product | undefined>(undefined);
  quantity = signal(1);
  products = signal<Product[]>(ProductData.products);

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
