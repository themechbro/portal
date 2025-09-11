"use client";
import {
  Box,
  Button,
  Card,
  Input,
  Typography,
  Divider,
  IconButton,
} from "@mui/joy";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import WarningIcon from "@mui/icons-material/Warning";
import { useState, useActionState, useEffect } from "react";
import InfoIcon from "@mui/icons-material/Info";
import { Snackbar, Alert } from "@mui/material"; // ✅ import added
import { Login } from "./auth-action";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => setShowPassword(!showPassword);

  const [formState, formAction] = useActionState(Login, {});
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [alert, setAlert] = useState(false);

  // open snackbar automatically when state updates
  useEffect(() => {
    if (formState.errors || formState.success) {
      setOpen(true);
    }
  }, [formState]);

  useEffect(() => {
    if (error === "notLoggedIn") {
      setAlert(true);
    }
  }, [error]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  // redirect on success
  useEffect(() => {
    if (formState.success) {
      const timer = setTimeout(() => {
        router.push("/home");
      }, 1500); // wait a moment so snackbar shows
      return () => clearTimeout(timer);
    }
  }, [formState.success, router]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Card
        variant="outlined"
        sx={{
          width: "100%",
          maxWidth: 520,
          p: 4,
          borderRadius: "2xl",
          boxShadow: "lg",
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
        }}
      >
        {/* //Not loggedin warning */}
        {alert ? (
          <Alert variant="filled" severity="error">
            You must be logged in to access the dashboard.
          </Alert>
        ) : (
          <div>
            <Typography
              level="h3"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                mb: 2,
                color: "#1E1E2F",
              }}
            >
              Welcome Back 👋
            </Typography>
            <Typography
              level="body-md"
              sx={{ textAlign: "center", mb: 3, color: "text.secondary" }}
            >
              Please log in to your account
            </Typography>
          </div>
        )}
        {/* Form */}
        <Box
          component="form"
          action={formAction} // ✅ hook up server action
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Input
            type="text"
            placeholder="Enter your Username"
            size="lg"
            variant="outlined"
            sx={{ borderRadius: "lg", px: 2 }}
            name="username"
          />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your Password"
            size="lg"
            variant="outlined"
            sx={{ borderRadius: "lg", px: 2 }}
            endDecorator={
              <IconButton onClick={handleTogglePassword} size="sm">
                {showPassword ? (
                  <VisibilityOffIcon color="primary" />
                ) : (
                  <VisibilityIcon />
                )}
              </IconButton>
            }
            name="password"
          />
          <Button type="submit" fullWidth size="lg" sx={{ mt: 1 }}>
            Log In
          </Button>
        </Box>
        <Divider sx={{ my: 3 }} />
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Typography level="body-sm" sx={{ color: "text.secondary" }}>
            <InfoIcon /> Forgot your password? Contact Administrator.
          </Typography>
        </Box>
        <Divider sx={{ my: 3 }} />
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Typography level="body-sm" sx={{ color: "text.secondary" }}>
            Don’t have an account?{" "}
            <a
              href="/Signup"
              style={{
                color: "#6366F1",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Sign Up
            </a>
          </Typography>
        </Box>
      </Card>

      {/* Notifications */}
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        {formState.errors ? (
          <Alert severity="error" onClose={handleClose}>
            {Object.values(formState.errors).join(", ")}
          </Alert>
        ) : formState.success ? (
          <Alert severity="success" onClose={handleClose}>
            Logged in successfully. Redirecting to home page...
          </Alert>
        ) : null}
      </Snackbar>
    </Box>
  );
}
