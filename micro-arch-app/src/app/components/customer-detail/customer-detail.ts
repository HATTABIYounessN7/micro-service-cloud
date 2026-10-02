import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../services/customer';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './customer-detail.html',
  styleUrl: './customer-detail.css',
})
export class CustomerDetailComponent implements OnInit {
  customer: Customer = { id: 0, name: '', email: '' };
  loading = true;
  saving = false;
  error = '';
  isNew = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === 'new') {
      this.isNew = true;
      this.loading = false;
    } else {
      this.customerService.getById(Number(id)).subscribe({
        next: (data) => {
          this.customer = data;
          this.loading = false;
        },
        error: () => {
          this.error = 'Customer not found.';
          this.loading = false;
        },
      });
    }
  }

  save(): void {
    this.saving = true;
    const action = this.isNew
      ? this.customerService.create(this.customer)
      : this.customerService.update(this.customer.id, this.customer);

    action.subscribe({
      next: () => this.router.navigate(['/customers']),
      error: () => {
        this.error = 'Failed to save.';
        this.saving = false;
      },
    });
  }
}
