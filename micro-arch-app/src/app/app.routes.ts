import { Routes } from '@angular/router';
import { CustomersComponent } from './components/customers/customers';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail';
import { ProductsComponent } from './components/products/products';
import { ProductDetailComponent } from './components/product-detail/product-detail';
import { BillsComponent } from './components/bills/bills';
import { BillDetailComponent } from './components/bill-detail/bill-detail';

export const routes: Routes = [
  { path: '', redirectTo: 'customers', pathMatch: 'full' },
  { path: 'customers', component: CustomersComponent },
  { path: 'customers/:id', component: CustomerDetailComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'bills', component: BillsComponent },
  { path: 'bills/:id', component: BillDetailComponent },
];
