import { getAllProducts } from "@/actions/products/action";
import InventoryTable from "@/components/dashboard/inventory-table";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

export default async function DashBoardPage() {
  const products = getAllProducts();

  return (
    <div className="flex w-full flex-col min-h-screen p-9 text-center gap-10 sm:text-left ">
      <Header title="Dashboard" />

      <Button asChild size="sm" variant={"default"} className="w-fit">
        <Link href="/protected/product/add">Add Product</Link>
      </Button>

      <Suspense fallback={<p>...Loading</p>}>
        <InventoryTable products={products} />
      </Suspense>
    </div>
  );
}
