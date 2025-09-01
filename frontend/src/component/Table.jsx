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
  TextField,
} from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/Delete";

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
        py: 1.5,
        borderTop: "1px solid #e5e7eb",
        backgroundColor: "#fafafa",
      }}
    >
      <Box display="flex" alignItems="center" gap={1}>
        <Typography variant="body2">Show</Typography>
        <Select
          value={pageSize}
          onChange={handlePageSizeChange}
          size="small"
          sx={{ height: 32, fontSize: "0.85rem", borderRadius: 2 }}
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

const Table = ({ recordList, handleUpdate, handleDelete }) => {
  const [searchText, setSearchText] = React.useState("");
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 8,
  });

  //search
  const filteredRecords = recordList.filter((item) => {
    const search = searchText.toLowerCase();
    return (
      item.firstName?.toLowerCase().includes(search) ||
      item.lastName?.toLowerCase().includes(search) ||
      item.phone?.toLowerCase().includes(search) ||
      item.email?.toLowerCase().includes(search) ||
      item.address?.toLowerCase().includes(search) ||
      item.stateName?.toLowerCase().includes(search) ||
      item.districtName?.toLowerCase().includes(search) ||
      item.cityName?.toLowerCase().includes(search) ||
      item.pincode?.toLowerCase().includes(search)
    );
  });

  const columns = [
    {
      field: "action",
      headerName: "Actions",
      width: 110,
      sortable: false,
      renderCell: (params) => (
        <Box display="flex" gap={1} alignItems="center">
          <IconButton
            onClick={() => handleUpdate(params.row)}
            sx={{
              border: "1px solid #9ca3af",
              borderRadius: "8px",
              width: 34,
              height: 34,
              color: "primary.main",
              "&:hover": { backgroundColor: "#f3f4f6" },
            }}
          >
            <DriveFileRenameOutlineIcon fontSize="small" />
          </IconButton>

          <IconButton
            onClick={() => handleDelete(params.row)}
            sx={{
              border: "1px solid #ef4444",
              borderRadius: "8px",
              width: 34,
              height: 34,
              color: "error.main",
              "&:hover": { backgroundColor: "#fee2e2" },
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
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

  return (
    <div className="container">
      <h2 className="text-lg font-semibold mb-4 text-center">
        Show the List of Records
      </h2>

      <Box display="flex" justifyContent="flex-end" mb={1}>
        <TextField
          size="small"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          sx={{
            width: 260,
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
        />
      </Box>

      <Paper
        sx={{
          height: 460,
          width: "100%",
          borderRadius: 3,
          p: 2,
          boxShadow: "0px 2px 6px rgba(0,0,0,0.05)",
        }}
      >
        <DataGrid
          rows={filteredRecords.map((item) => ({ ...item, id: item._id }))}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[8, 10, 20, 30, 40, 50]}
          disableRowSelectionOnClick
          slots={{
            toolbar: GridToolbar,
            footer: () => (
              <CustomFooter
                paginationModel={paginationModel}
                setPaginationModel={setPaginationModel}
                rowCount={filteredRecords.length}
              />
            ),
          }}
          sx={{
            border: 0,
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: "#f5f5f5",
              color: "#374151",
              fontWeight: 600,
              fontSize: "0.95rem",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              textTransform: "capitalize",
            },

            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#fefefe",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid #f0f0f0",
              fontSize: "0.9rem",
              py: 1,
            },
          }}
        />
      </Paper>
    </div>
  );
};

export default Table;
