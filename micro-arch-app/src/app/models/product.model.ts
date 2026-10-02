export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface ProductPage {
  _embedded: {
    products: Product[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
