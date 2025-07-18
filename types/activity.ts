
export type ActivityLog = {
  id: string;
  action: "add_product" | "edit_product" | "delete_product";
  change_detail: {
    product_name: string;
    sku: string;
  };
  users: {
    email: string;
  };
  created_at: string;
};
