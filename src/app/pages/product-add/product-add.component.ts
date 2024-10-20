import { Component, inject } from '@angular/core';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { Product, ProductService } from '../../services/product.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [ProductFormComponent],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css',
})
export class ProductAddComponent {
  productService = inject(ProductService);
  toast = inject(HotToastService);
  router = inject(Router);

  handleSubmit(values: Product) {
    this.productService.addProduct(values).subscribe({
      next: () => {
        this.toast.success('Add product');
        this.router.navigateByUrl('/product/list');
      },
      error: () => this.toast.error('Error'),
    });
  }
}
