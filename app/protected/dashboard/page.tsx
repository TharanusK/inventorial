"use client";
import { getAllProducts } from "@/actions/products/action";
import InventoryTable from "@/components/dashboard/inventory-table";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Product } from "@/types/products";

export default function DashBoardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");

  // Fetch all products
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(true);
      getAllProducts(search).then((data) => {
        setProducts(data);
        setIsLoading(false);
      });
    }, 300); // debounce

    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <div className="flex w-full flex-col min-h-screen p-9 text-center gap-10 sm:text-left ">
      <Header title="Dashboard" />
      <div className="flex w-full justify-between">
        <div className="relative w-[35%]">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
            <SearchIcon />
          </span>
          <Input
            className="pl-10 bg-card rounded-lg placeholder:text-sm"
            placeholder="Search "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2 items-center">
          <Button asChild size="sm" className="w-fit bg-[#A3C9A8]">
            <Link href="/protected/product/add">Add Product</Link>
          </Button>
        </div>
      </div>

      {isLoading && products.length === 0 ? (
        <p className="text-muted-foreground text-center">Loading products...</p>
      ) : (
        <div className="overflow-x-auto w-full">
          <div className="min-w-[900px] md:min-w-full">
            <InventoryTable products={products} />
          </div>
        </div>
      )}
    </div>
  );
}
