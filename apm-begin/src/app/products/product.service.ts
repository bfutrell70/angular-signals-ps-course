import { httpResource } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'api/products';

  // how does this access products in app-data.ts?
  productsResource = httpResource<Product[]>(() => this.productsUrl, { defaultValue: []});

  // createProducts() {
  //   return httpResource<Product[]>(() => this.productsUrl, { defaultValue: []});
  // }

  selectedProduct = signal<Product | undefined>(undefined);
}
