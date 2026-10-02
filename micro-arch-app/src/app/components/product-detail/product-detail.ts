import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetailComponent implements OnInit {
  product: Product = { id: '', name: '', price: 0, quantity: 0 };
  loading = true;
  saving = false;
  error = '';
  isNew = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === 'new') {
      this.isNew = true;
      this.loading = false;
    } else {
      this.productService.getById(id!).subscribe({
        next: (data) => {
          this.product = data;
          this.loading = false;
        },
        error: () => {
          this.error = 'Product not found.';
          this.loading = false;
        },
      });
    }
  }

  save(): void {
    this.saving = true;
    const action = this.isNew
      ? this.productService.create(this.product)
      : this.productService.update(this.product.id, this.product);

    action.subscribe({
      next: () => this.router.navigate(['/products']),
      error: () => {
        this.error = 'Failed to save.';
        this.saving = false;
      },
    });
  }
}
