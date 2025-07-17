import AddProductForm from "@/components/form/product/add-product-form";
import GoBackButtonWithTitle from "@/components/go-back-button-with-title";

export default async function AddProductPage() {
  return (
    <div className="flex w-full flex-col min-h-screen p-16 gap-6">
      <GoBackButtonWithTitle href="/protected/dashboard" title="Add Product" />
      <AddProductForm />
    </div>
  );
}
