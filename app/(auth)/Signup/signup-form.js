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
import { useState } from "react";
import InfoIcon from "@mui/icons-material/Info";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    setPasswordsMatch(value !== "" && value === confirmPassword);
  };

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
    setPasswordsMatch(password !== "" && password === value);
  };

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
        {/* Title */}
        <Typography
          level="h3"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            mb: 2,
            color: "#1E1E2F",
          }}
        >
          To Access CSIR IPU Portal, you need to Sign Up
        </Typography>
        <Typography
          level="body-md"
          sx={{ textAlign: "center", mb: 3, color: "text.secondary" }}
        >
          Signing up is easy and only takes a few minutes.
        </Typography>

        {/* Form */}
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Input
            type="text"
            placeholder="Enter your Username"
            size="lg"
            variant="outlined"
            sx={{ borderRadius: "lg", px: 2 }}
          />
          <Input
            type="email"
            placeholder="Enter your Email"
            size="lg"
            variant="outlined"
            sx={{ borderRadius: "lg", px: 2 }}
          />
          <Input
            type="password"
            placeholder="Enter your Password"
            size="lg"
            variant="outlined"
            sx={{ borderRadius: "lg", px: 2 }}
            onChange={(e) => handlePasswordChange(e.target.value)}
          />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Retype your Password"
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
            onChange={(e) => handleConfirmPasswordChange(e.target.value)}
            color={
              passwordsMatch || confirmPassword === "" ? "neutral" : "danger"
            }
          />

          {/* Button disabled until passwords match */}
          <Button
            type="submit"
            fullWidth
            size="lg"
            sx={{
              mt: 1,
              borderRadius: "lg",
              color: "#fff",
              fontWeight: "bold",
              "&:hover": { opacity: 0.9 },
            }}
            disabled={!passwordsMatch}
          >
            Sign Up
          </Button>
        </Box>

        {/* Divider */}
        <Divider sx={{ my: 3 }} />
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Typography level="body-sm" sx={{ color: "text.secondary" }}>
            <InfoIcon /> Remember to use a strong password to keep your account
            secure. If you forget your password, you can reset it by contacting
            the administrator.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />
        {/* Footer */}
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Typography level="body-sm" sx={{ color: "text.secondary" }}>
            Have an account already?{" "}
            <a
              href="/Login"
              style={{
                color: "#6366F1",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Login
            </a>
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}
