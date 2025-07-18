export type ActivityLog = {
  id: string;
  action: "add_product" | "edit_product" | "delete_product";
  change_detail: string;
  created_at: string;
  user_id: {
    user_name: string;
  } | null;
  product_id: string | null;
  product: {
    id: string;
    name: string;
    sku: string;
  } | null;
};
