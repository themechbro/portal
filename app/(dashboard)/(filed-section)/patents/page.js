"use client";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography, CircularProgress } from "@mui/joy";
import { useRouter } from "next/navigation";

export default function AppliedPatentsTable() {
  const [patents, setPatents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const [rowCount, setRowCount] = useState(0);
  const router = useRouter();
  const fetchPatents = async (page, pageSize) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST_IP}/getAppliedPatentsforTable?page=${page}&pageSize=${pageSize}`,
        { method: "GET", credentials: "include" }
      );
      const data = await response.json();

      // format dates safely
      const formattedData = data.patents.map((patent) => ({
        ...patent,
        created_at_formatted: patent.created_at
          ? `${String(new Date(patent.created_at).getDate()).padStart(
              2,
              "0"
            )} ${String(new Date(patent.created_at).getMonth() + 1).padStart(
              2,
              "0"
            )} ${new Date(patent.created_at).getFullYear()}`
          : "",
      }));

      setPatents(formattedData);
      setRowCount(data.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatents(paginationModel.page, paginationModel.pageSize);
  }, [paginationModel]);

  const columns = [
    { field: "nf_no", headerName: "NF No", flex: 1, minWidth: 120 },
    {
      field: "title_of_invention",
      headerName: "Title",
      flex: 2,
      minWidth: 200,
    },
    { field: "type_of_invention", headerName: "Type", flex: 1, minWidth: 150 },
    {
      field: "subject_of_invention",
      headerName: "Subject",
      flex: 2,
      minWidth: 200,
    },
    {
      field: "created_at_formatted",
      headerName: "Filed On",
      flex: 1,
      minWidth: 150,
    },
  ];

  const handleRowClick = (params) => {
    const nf_no = params.row.nf_no;
    router.push(`/viewPatent/${nf_no}`);
  };

  return (
    <Box sx={{ height: 500, width: "100%", p: 4 }}>
      <Typography
        level="h2"
        mb={2}
        sx={{
          fontFamily: "Roboto Condensed",
        }}
      >
        My Applied Patents
      </Typography>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <DataGrid
          rows={patents}
          columns={columns}
          getRowId={(row) => row.nf_no}
          paginationMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5, 10, 25]}
          rowCount={rowCount}
          disableSelectionOnClick
          autoHeight
          sx={{
            borderRadius: 3,
            boxShadow: 3,
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#1976d2",
              color: "#000000ff",
              fontWeight: 600,
              fontFamily: "Roboto Condensed",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "rgba(25,118,210,0.1)",
              cursor: "pointer",
            },
            "& .MuiDataGrid-cell": {
              fontFamily: "Roboto Condensed",
            },
          }}
          onRowClick={handleRowClick}
        />
      )}
    </Box>
  );
}
