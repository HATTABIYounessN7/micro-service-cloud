import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../services/customer';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './customers.html',
  styleUrl: './customers.css',
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = [];
  loading = true;
  error = '';

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.loading = true;
    this.customerService.getAll().subscribe({
      next: (data) => {
        this.customers = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load customers. Is the gateway running?';
        this.loading = false;
        console.error(err);
      },
    });
  }

  deleteCustomer(id: number): void {
    if (!confirm('Delete this customer?')) return;
    this.customerService.delete(id).subscribe({
      next: () => this.loadCustomers(),
      error: () => (this.error = 'Failed to delete customer.'),
    });
  }
}
