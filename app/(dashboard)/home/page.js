import { Box, Typography } from "@mui/joy";
import { Toolbar } from "@mui/material";
import Link from "next/link";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FilingCards from "@/app/components/filing-card";
import AppliedPatentsTable from "@/app/components/appliedPatentsTable";

export default function HomePage() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#F5F5F5",
        transition: "background-color 0.5s ease-in",
      }}
    >
      <Box component="main" sx={{ width: "100%", mt: 2 }}>
        <Toolbar>
          <Typography
            level="h2"
            gutterBottom
            style={{
              fontFamily: "Roboto Condensed",
            }}
          >
            Dashboard
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </Box>
      <FilingCards />
      <AppliedPatentsTable />
    </Box>
  );
}
