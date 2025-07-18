import * as React from "react";

import { Toolbar, ToolbarButton } from "@mui/x-data-grid";

import Tooltip from "@mui/material/Tooltip";

import FileDownloadIcon from "@mui/icons-material/FileDownload";

import Typography from "@mui/material/Typography";

export default function CustomToolbar() {
  const [exportMenuOpen, setExportMenuOpen] = React.useState(false);
  const exportMenuTriggerRef = React.useRef<HTMLButtonElement>(null);

  return (
    <Toolbar
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography fontWeight="medium" marginLeft={2}>
        Product Inventory
      </Typography>

      <Tooltip title="Export">
        <ToolbarButton
          ref={exportMenuTriggerRef}
          id="export-menu-trigger"
          aria-controls="export-menu"
          aria-haspopup="true"
          aria-expanded={exportMenuOpen ? "true" : undefined}
          onClick={() => setExportMenuOpen(true)}
        >
          <FileDownloadIcon fontSize="small" />
        </ToolbarButton>
      </Tooltip>
    </Toolbar>
  );
}
