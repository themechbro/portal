"use client";
import {
  Box,
  Typography,
  Divider,
  Card,
  CardContent,
  Button,
  IconButton,
  Snackbar,
} from "@mui/joy";
import UploadIcon from "@mui/icons-material/Upload";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

export default function UploadDocumentsForm({ patentData, onUpdate }) {
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    color: "danger",
  });

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

  const handleFileChange = (field, file) => {
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      setSnackbar({
        open: true,
        message: `❌ File size exceeds 10 MB (${(
          file.size /
          1024 /
          1024
        ).toFixed(1)} MB)`,
        color: "danger",
      });
      return;
    }

    const newFiles = { ...uploadedFiles, [field]: file };
    setUploadedFiles(newFiles);
    onUpdate({ ...patentData, [field]: file });
  };

  const handleDelete = (field) => {
    const newFiles = { ...uploadedFiles };
    delete newFiles[field];
    setUploadedFiles(newFiles);
    onUpdate({ ...patentData, [field]: null });
  };

  // A helper to render upload cards
  const renderUploadCard = (label, fieldKey) => (
    <Card
      variant="outlined"
      sx={{
        borderRadius: "xl",
        boxShadow: "sm",
        transition: "0.3s",
        "&:hover": {
          boxShadow: "md",
          borderColor: "primary.outlinedHoverBorder",
        },
      }}
    >
      <CardContent>
        <Typography level="title-md" sx={{ mb: 1 }}>
          {label}
        </Typography>
        {uploadedFiles[fieldKey] ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography level="body2" sx={{ flex: 1 }}>
              {uploadedFiles[fieldKey].name} (
              {(uploadedFiles[fieldKey].size / 1024 / 1024).toFixed(1)} MB)
            </Typography>
            <IconButton
              size="sm"
              variant="soft"
              color="danger"
              onClick={() => handleDelete(fieldKey)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        ) : (
          <Button
            variant="soft"
            color="primary"
            startDecorator={<UploadIcon />}
            component="label"
          >
            Choose File
            <input
              type="file"
              hidden
              onChange={(e) => handleFileChange(fieldKey, e.target.files[0])}
            />
          </Button>
        )}
      </CardContent>
    </Card>
  );

  return (
    <>
      <Box
        sx={{
          p: 4,
          borderRadius: "xl",
          boxShadow: "md",
          maxWidth: 800,
          mx: "auto",
          mt: 3,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          backgroundColor: "background.surface",
        }}
      >
        <Typography level="h4" sx={{ textAlign: "center", fontWeight: "lg" }}>
          Upload Required Documents
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Box sx={{ display: "grid", gap: 2 }}>
          {patentData.nbaApproved &&
            renderUploadCard("Upload NBA Approval", "nbaFile")}
          {patentData.specificationAvailable &&
            renderUploadCard("Upload Specification", "specificationFile")}
          {patentData.softCopiesAvailable &&
            renderUploadCard("Upload Soft Copies", "softCopiesFile")}
          {patentData.form1Available &&
            renderUploadCard("Upload Form 1", "form1File")}
          {patentData.idfAvailable && renderUploadCard("Upload IDF", "idfFile")}
        </Box>
      </Box>

      <Snackbar
        open={snackbar.open}
        color={snackbar.color}
        variant="soft"
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        {snackbar.message}
      </Snackbar>
    </>
  );
}
