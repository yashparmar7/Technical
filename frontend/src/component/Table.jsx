import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  Paper,
  IconButton,
  Select,
  MenuItem,
  Typography,
  Box,
  Pagination,
} from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

function CustomFooter({ paginationModel, setPaginationModel, rowCount }) {
  const { page, pageSize } = paginationModel;
  const pageCount = Math.ceil(rowCount / pageSize) || 1;

  const handlePageSizeChange = (event) => {
    setPaginationModel((prev) => ({
      ...prev,
      pageSize: event.target.value,
      page: 0,
    }));
  };

  const handlePageChange = (_, value) => {
    setPaginationModel((prev) => ({ ...prev, page: value - 1 }));
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 2,
        py: 1,
        borderTop: "1px solid #e5e7eb",
      }}
    >
      <Box display="flex" alignItems="center" gap={1}>
        <Typography variant="body2">Show</Typography>
        <Select
          value={pageSize}
          onChange={handlePageSizeChange}
          size="small"
          sx={{ height: 32, fontSize: "0.85rem" }}
        >
          {[8, 10, 20, 30, 40, 50].map((size) => (
            <MenuItem key={size} value={size}>
              {size}
            </MenuItem>
          ))}
        </Select>
        <Typography variant="body2">entries per page</Typography>
      </Box>

      <Box display="flex" alignItems="center" gap={2}>
        <Typography variant="body2">
          Page {page + 1} of {pageCount}
        </Typography>
        <Pagination
          count={pageCount}
          page={page + 1}
          onChange={handlePageChange}
          shape="rounded"
          color="primary"
          size="small"
        />
      </Box>
    </Box>
  );
}

const Table = ({ recordList, handleUpdate }) => {
  const columns = [
    {
      field: "action",
      headerName: "Actions",
      width: 70,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleUpdate(params.row)}
          sx={{
            border: "1px solid #9ca3af",
            borderRadius: "8px",
            width: 32,
            height: 32,
            color: "primary.main",
            "&:hover": { backgroundColor: "#f3f4f6" },
          }}
        >
          <DriveFileRenameOutlineIcon />
        </IconButton>
      ),
    },
    { field: "firstName", headerName: "First name", flex: 1, minWidth: 100 },
    { field: "lastName", headerName: "Last name", flex: 1, minWidth: 100 },
    { field: "phone", headerName: "Phone", flex: 1, minWidth: 120 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 160 },
    { field: "address", headerName: "Address", flex: 1, minWidth: 160 },
    { field: "stateName", headerName: "State", flex: 1, minWidth: 100 },
    { field: "districtName", headerName: "District", flex: 1, minWidth: 100 },
    { field: "cityName", headerName: "City", flex: 1, minWidth: 100 },
    { field: "pincode", headerName: "Zip", flex: 1, minWidth: 100 },
  ];

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 8,
  });

  return (
    <div className="container">
      <h2 className="text-lg font-semibold mb-4 flex justify-center items-center">
        Show the List of Records
      </h2>
      <Paper sx={{ height: 420, width: "100%", borderRadius: 3, p: 1 }}>
        <DataGrid
          rows={recordList.map((item) => ({ ...item, id: item._id }))}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[8, 10, 20, 30, 40, 50]}
          slots={{
            toolbar: GridToolbar,
            footer: () => (
              <CustomFooter
                paginationModel={paginationModel}
                setPaginationModel={setPaginationModel}
                rowCount={recordList.length}
              />
            ),
          }}
          sx={{
            border: 0,
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: "#f5f5f5",
              color: "#333",
              fontWeight: "bold",
              fontSize: "0.95rem",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              textTransform: "capitalize",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#ffff",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid #f0f0f0",
              fontSize: "0.9rem",
            },
          }}
        />
      </Paper>
    </div>
  );
};

export default Table;
