import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent {
  @Input() productId: string | null = null;
  @Output() onSubmit = new EventEmitter();

  productForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    quantity: new FormControl(0, [Validators.required, Validators.min(2)]),
    category: new FormControl('', [Validators.required]),
  });

  get name() {
    return this.productForm.get('name');
  }

  get image() {
    return this.productForm.get('image');
  }

  get quantity() {
    return this.productForm.get('quantity');
  }

  get category() {
    return this.productForm.get('category');
  }

  productService = inject(ProductService);
  toast = inject(HotToastService);

  ngOnInit() {
    if (!this.productId) return;
    this.productService.getDetail(this.productId).subscribe({
      next: (data) => {
        this.productForm.patchValue(data);
        this.toast.success('Done');
      },
      error: () => this.toast.error('Error'),
    });
  }

  handleSubmit() {
    this.onSubmit.emit(this.productForm.value);
  }
}
