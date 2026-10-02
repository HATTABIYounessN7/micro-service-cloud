import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BillService } from '../../services/bill';
import { Bill } from '../../models/bill.model';

@Component({
  selector: 'app-bills',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './bills.html',
  styleUrl: './bills.css',
})
export class BillsComponent implements OnInit {
  bills: Bill[] = [];
  loading = true;
  error = '';

  constructor(private billService: BillService) {}

  ngOnInit(): void {
    this.billService.getAll().subscribe({
      next: (data) => {
        this.bills = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load bills.';
        this.loading = false;
      },
    });
  }

  getTotal(bill: Bill): number {
    return bill.productItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  }
}
