import { getAllProducts } from "@/actions/products/action";
import InventoryTable from "@/components/dashboard/inventory-table";
import Header from "@/components/header";
import { Suspense } from "react";

export default async function DashBoardPage() {
  const products = getAllProducts();

  return (
    <div className="flex w-full flex-col min-h-screen p-9 border-2 border-gray-200 text-center gap-10 sm:text-left ">
      <Header title="Dashboard" />

      <Suspense fallback={<p>...Loading</p>}>
        <InventoryTable products={products} />
      </Suspense>
    </div>
  );
}
