"use server";

import { createClient } from "@/lib/supabase/server";
import { ProductActionResult } from "@/types/products";
import { redirect } from "next/navigation";

export async function getAllProducts() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error.message);
    throw new Error("Failed to fetch products.");
  }

  return data;
}

export async function getProductById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching product by ID:", error.message);
    return null;
  }

  return data;
}

export async function addProduct(
  _: unknown,
  formData: FormData
): Promise<ProductActionResult> {
  const errors: Record<string, string> = {};

  const nameValue = formData.get("name");
  const name = typeof nameValue === "string" ? nameValue.trim() : "";
  const skuValue = formData.get("sku");
  const sku = typeof skuValue === "string" ? skuValue.trim() : "";
  const quantity = Number(formData.get("quantity"));
  const unitValue = formData.get("unit");
  const unit = typeof unitValue === "string" ? unitValue.trim() : "";
  const low_stock_threshold = Number(formData.get("low_stock_threshold"));

  // Validation
  if (!name) errors.name = "Name is required.";
  if (!sku) errors.sku = "SKU is required.";
  if (!unit) errors.unit = "Unit is required.";
  if (isNaN(quantity) || quantity < 0)
    errors.quantity = "Quantity must be a valid number.";
  if (isNaN(low_stock_threshold) || low_stock_threshold < 0) {
    errors.low_stock_threshold = "Low stock threshold must be a valid number.";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  const { error } = await supabase.from("products").insert([
    {
      name,
      sku,
      quantity,
      unit,
      low_stock_threshold,
      created_by: data.user?.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]);

  if (error) {
    return {
      success: false,
      errors: { form: "Failed to add product: " + error.message },
    };
  }

  redirect("/protected/dashboard");
}

export async function editProduct(
  productId: string,
  _: unknown,
  formData: FormData
): Promise<ProductActionResult> {
  const errors: Record<string, string> = {};

  const nameValue = formData.get("name");
  const name = typeof nameValue === "string" ? nameValue.trim() : "";
  const skuValue = formData.get("sku");
  const sku = typeof skuValue === "string" ? skuValue.trim() : "";
  const quantity = Number(formData.get("quantity"));
  const unitValue = formData.get("unit");
  const unit = typeof unitValue === "string" ? unitValue.trim() : "";
  const low_stock_threshold = Number(formData.get("low_stock_threshold"));

  if (!name) errors.name = "Name is required.";
  if (!sku) errors.sku = "SKU is required.";
  if (!unit) errors.unit = "Unit is required.";
  if (isNaN(quantity) || quantity < 0)
    errors.quantity = "Quantity must be a valid number.";
  if (isNaN(low_stock_threshold) || low_stock_threshold < 0) {
    errors.low_stock_threshold = "Low stock threshold must be a valid number.";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("products")
    .update({
      name,
      sku,
      quantity,
      unit,
      low_stock_threshold,
      updated_at: new Date().toISOString(),
    })
    .eq("id", productId);

  if (error) {
    return {
      success: false,
      errors: { form: "Failed to update product: " + error.message },
    };
  }

  redirect("/protected/dashboard");
}
export async function deleteProduct(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    console.error("Error deleting product:", error.message);
    return {
      success: false,
      error: error.message,
    };
  }
  return {
    success: true,
  };
}
