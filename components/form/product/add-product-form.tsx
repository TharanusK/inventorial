"use client";

import { useActionState } from "react";
import { addProduct } from "@/actions/products/action";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AddProductActionResult } from "@/types/products";
import Link from "next/link";

export default function AddProductForm() {
  const [state, formAction] = useActionState<
    AddProductActionResult | null,
    FormData
  >(addProduct, null);

  return (
    <form action={formAction} className="gap-4 flex flex-col">
      <div>
        <Label htmlFor="name">Product Name</Label>
        <Input name="name" id="name" required />
        {state?.errors?.name && (
          <p className="text-error text-sm">{state.errors.name}</p>
        )}
      </div>

      <div>
        <Label htmlFor="sku">SKU</Label>
        <Input name="sku" id="sku" required />
        {state?.errors?.sku && (
          <p className="text-error text-sm">{state.errors.sku}</p>
        )}
      </div>

      <div>
        <Label htmlFor="quantity">Quantity</Label>
        <Input name="quantity" id="quantity" type="number" required />
        {state?.errors?.quantity && (
          <p className="text-error text-sm">{state.errors.quantity}</p>
        )}
      </div>

      <div>
        <Label htmlFor="unit">Unit</Label>
        <Input name="unit" id="unit" required />
        {state?.errors?.unit && (
          <p className="text-error text-sm">{state.errors.unit}</p>
        )}
      </div>

      <div>
        <Label htmlFor="low_stock_threshold">Low Stock Threshold</Label>
        <Input
          name="low_stock_threshold"
          id="low_stock_threshold"
          type="number"
          required
        />
        {state?.errors?.low_stock_threshold && (
          <p className="text-error text-sm">
            {state.errors.low_stock_threshold}
          </p>
        )}
      </div>
      {state?.errors?.form && (
        <p className="text-error text-sm">{state.errors.form}</p>
      )}
      <div className="flex gap-6 justify-center mt-4 sm:justify-end">
        <Button type="reset" variant="outline" size={"lg"}>
          <Link href="/protected/dashboard">Cancle</Link>
        </Button>
        <Button type="submit" size={"lg"}>
          Add Product
        </Button>
      </div>
    </form>
  );
}
