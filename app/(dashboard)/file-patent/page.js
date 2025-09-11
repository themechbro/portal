import { Typography, Box } from "@mui/joy";

export default function FilePatentPage() {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 2,
      }}
    >
      <Typography
        level="h2"
        sx={{
          fontFamily: "Roboto Condensed",
          textTransform: "uppercase",
          letterSpacing: 1.5,
          wordSpacing: 2,
        }}
      >
        File a new patent
      </Typography>
    </Box>
  );
}
