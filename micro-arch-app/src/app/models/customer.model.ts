export interface Customer {
  id: number;
  name: string;
  email: string;
}

export interface CustomerPage {
  _embedded: {
    customers: Customer[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
