import { editProduct, getProductById } from "@/actions/products/action";
import ProductForm from "@/components/form/product/product-form";
import GoBackButtonWithTitle from "@/components/go-back-button-with-title";

export default async function EditProductPage({
  searchParams,
}: Readonly<{ searchParams: { product_id: string } }>) {
  const params = await searchParams;

  const productId = params.product_id;

  const product = await getProductById(productId);

  return (
    <div className="flex w-full flex-col min-h-screen p-16 gap-6">
      <GoBackButtonWithTitle href="/protected/dashboard" title="Edit Product" />
      <ProductForm
        onSubmit={editProduct.bind(null, productId)}
        initialValues={{
          name: product.name,
          sku: product.sku,
          quantity: product.quantity,
          unit: product.unit,
          low_stock_threshold: product.low_stock_threshold,
        }}
        submitLabel="Update Product"
      />
    </div>
  );
}
