import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../product';
import { ProductData } from '../product-data';

@Component({
  selector: 'app-product-selection',
  imports: [FormsModule],
  templateUrl: './product-selection.html',
  styleUrl: './product-selection.css'
})
export class ProductSelection {
  pageTitle = 'Product Selection';

  quantity = signal(1);
  products = signal<Product[]>(ProductData.products);
}
