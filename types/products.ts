export type Product = {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  unit: string;
  low_stock_threshold: number;
  created_at: string;
  updated_at: string;
};

export type AddProductActionResult = {
  success: boolean;
  errors?: {
    name?: string;
    sku?: string;
    quantity?: string;
    unit?: string;
    low_stock_threshold?: string;
    form?: string;
  };
};
