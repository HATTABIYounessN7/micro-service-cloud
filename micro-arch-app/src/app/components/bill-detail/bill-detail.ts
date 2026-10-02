import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BillService } from '../../services/bill';
import { Bill } from '../../models/bill.model';

@Component({
  selector: 'app-bill-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './bill-detail.html',
  styleUrl: './bill-detail.css',
})
export class BillDetailComponent implements OnInit {
  bill?: Bill;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private billService: BillService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.billService.getById(id).subscribe({
      next: (data) => {
        this.bill = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Bill not found.';
        this.loading = false;
      },
    });
  }

  getTotal(): number {
    return (
      this.bill?.productItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0) ?? 0
    );
  }
}
