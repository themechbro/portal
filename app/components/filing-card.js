import { Button, Typography } from "@mui/joy";
import { Box } from "@mui/material";
import { filing_list } from "../misc/filing-list";
import { redirect } from "next/navigation";

export default function FilingCards() {
  return (
    <Box
      sx={{
        mt: 8,
        px: 4,
        p: 3,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        border: "3px dashed #3e4a50ff",
        borderRadius: 3,
      }}
    >
      {/* Heading */}
      <Typography
        level="h3"
        sx={{
          fontFamily: "Roboto Condensed",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        File a new application
      </Typography>

      {/* Button Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 3,
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        {filing_list.map((filing) => (
          <Button
            key={filing.id}
            startDecorator={filing.icon}
            variant="solid"
            color="primary"
            sx={{
              py: 3,
              borderRadius: "16px",
              fontSize: "1rem",
              fontWeight: "bold",
              textTransform: "none",
              boxShadow: "md",
              transition: "all 0.3s ease",
              ":hover": {
                transform: "translateY(-4px)",
                boxShadow: "lg",
              },
            }}
          >
            <a href={filing.link}>{filing.name}</a>
          </Button>
        ))}
      </Box>
    </Box>
  );
}
