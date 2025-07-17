"use client";
import { use } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Tooltip from "@mui/material/Tooltip";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { Product } from "@/types/products";
import { format } from "date-fns";

interface InventoryTableProps {
  products: Promise<Product[]>;
}

export default function InventoryTable({
  products,
}: Readonly<InventoryTableProps>) {
  const resolvedProducts = use(products);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Product Name",
      flex: 1,
    },
    { field: "sku", headerName: "SKU", flex: 1 },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
      renderCell: (params) => {
        const { quantity, low_stock_threshold } = params.row;
        const isLow = quantity <= low_stock_threshold;

        return (
          <div className="flex items-center gap-2">
            <span>{quantity}</span>
            {isLow && (
              <Tooltip title="Low stock">
                <WarningAmberIcon fontSize="small" color="warning" />
              </Tooltip>
            )}
          </div>
        );
      },
    },
    { field: "unit", headerName: "Unit", flex: 1 },
    {
      field: "updated_at",
      headerName: "Last Updated",
      flex: 1,
      renderCell: (params: { row: Product }) =>
        format(new Date(params.row.updated_at), "yyyy-MM-dd HH:mm"),
    },
  ];

  return (
    <div className="h-[600px] w-full ">
      <DataGrid
        rows={resolvedProducts}
        columns={columns}
        getRowId={(row) => row.id}
        checkboxSelection
        disableRowSelectionOnClick
        pageSizeOptions={[10, 25, 50]}
        sx={{
          borderRadius: "8px",
          "& .MuiDataGrid-cell:hover": {
            color: "#6D67C6",
          },
        }}
      />
    </div>
  );
}
