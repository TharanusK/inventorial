"use client";
import { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Tooltip from "@mui/material/Tooltip";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { Product } from "@/types/products";
import { format } from "date-fns";
import Link from "next/link";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Image from "next/image";
import { Button } from "../ui/button";
import { deleteProduct } from "@/actions/products/action";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import CustomToolbar from "./toolbar-table";

const modalStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "hsl(var(--card))",
  border: "3px solid rgba(0, 0, 0, 0.1)",
  boxShadow: 24,
  p: 4,
  borderRadius: "16px",
  width: "50%",
};

interface InventoryTableProps {
  products: Product[];
}

export default function InventoryTable({
  products,
}: Readonly<InventoryTableProps>) {
  const router = useRouter();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [productName, setProductName] = useState<string | null>(null);
  const [productId, setProductId] = useState<string>("");

  const handleOpen = (row: Product) => {
    setOpenModal(true);
    setProductId(row.id);
    setProductName(row.name);
  };
  const handleClose = () => setOpenModal(false);

  const handleDelete = async (id: string) => {
    const res = await deleteProduct(id);
    if (!res.success) {
      console.error("Failed to delete product:");
      return;
    }
    toast.success("Product deleted successfully!");
    handleClose();
    router.push("/protected/dashboard");
  };

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
                <ErrorOutlineIcon
                  sx={{ color: "#FF6961", fontSize: 20, mb: "2px" }}
                />
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
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      filterable: false,
      flex: 1,
      renderCell: (params: { row: Product }) => (
        <div className="flex items-center gap-2">
          <Tooltip title="Edit">
            <Link href={`/protected/product/edit?product_id=${params.row.id}`}>
              <EditIcon fontSize="small" sx={{ color: "#6D67C6" }} />
            </Link>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton size="small" onClick={() => handleOpen(params.row)}>
              <DeleteIcon fontSize="small" sx={{ color: "#f87171" }} />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div className="h-[600px] w-full bg-card  ">
      <DataGrid
        rows={products}
        columns={columns}
        getRowId={(row) => row.id}
        checkboxSelection
        disableRowSelectionOnClick
        showToolbar
        slots={{ toolbar: CustomToolbar }}
        pageSizeOptions={[10, 25, 50]}
        localeText={{
          noRowsLabel: "No products",
          footerRowSelected: (count) =>
            count !== 1 ? `${count.toLocaleString()} selected` : `1 selected`,
        }}
        sx={{
          borderRadius: 2,
          border: "1px solid #E5E7EB",
          backgroundColor: "transparent",
          // Column headers background and text
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "hsl(var(--card))",
            color: "hsl(var(--foreground))",
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "hsl(var(--card))",
            color: "hsl(var(--foreground))",
          },

          // Cell text color
          "& .MuiDataGrid-cell": {
            color: "hsl(var(--foreground))",
          },

          // Hovered row
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "rgba(109, 103, 198, 0.1)",
          },

          // Remove blue focus outline
          "& .MuiDataGrid-cell:focus": {
            outline: "none",
          },

          // Hover color override
          "& .MuiDataGrid-cell:hover": {
            color: "hsl(var(--bg-foreground))",
          },
          // Checkbox color (unchecked + checked)
          "& .MuiCheckbox-root": {
            color: "hsl(var(--foreground))",
          },

          "& .MuiDataGrid-row.Mui-selected": {
            backgroundColor: "hsl(var(--muted)) !important",
            color: "hsl(var(--foreground)) !important",
          },

          "& .MuiDataGrid-row.Mui-selected:hover": {
            backgroundColor: "hsl(var(--muted)) !important",
          },

          // Footer row selection label
          "& .MuiDataGrid-selectedRowCount": {
            color: "hsl(var(--foreground))",
          },

          // Pagination buttons (arrows, numbers)
          "& .MuiTablePagination-actions button": {
            color: "hsl(var(--foreground))",
          },

          // Column menu (3 dots)
          "& .MuiDataGrid-menuIcon": {
            color: "hsl(var(--foreground))",
          },
        }}
      />

      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="delete-modal"
        aria-describedby="delete-product"
      >
        <Box sx={modalStyles}>
          <div className="flex flex-col justify-center items-center gap-4">
            <Image
              src={"/Icons/delete-icon-bg-red.svg"}
              alt="delete"
              width={35}
              height={35}
            />

            <p className="font-semibold text-lg ">Delete Product</p>
            <p className="text-foreground text-center">
              Are you sure you want to delete this{" "}
              <span className="font-semibold text-lg">{productName}</span>? This
              action cannot be undone.
            </p>
            <div className="flex gap-6 justify-center mt-4 sm:justify-end">
              <Button
                type="reset"
                variant="outline"
                size={"lg"}
                onClick={handleClose}
              >
                Cancle
              </Button>
              <Button
                className="bg-error"
                size={"lg"}
                onClick={() => handleDelete(productId)}
              >
                Delete
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
