"use client";
import { Typography } from "@mui/joy";
import LoginForm from "./login-form";
import { Box } from "@mui/material";
import Image from "next/image";
import csirLogo from "@/public/assets/logo.png";

export default function Login() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 4,
        py: 6,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
          width: "100%",
          maxWidth: 1200,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {/* Left section: Logo + Branding */}
        <Box
          sx={{
            flex: 1,
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Image
            src={csirLogo}
            alt="CSIR Logo"
            width={260}
            height={260}
            style={{
              objectFit: "contain",
              margin: "0 auto",
            }}
          />
          <Typography
            level="h2"
            sx={{
              fontWeight: "bold",
              mt: 3,
              color: "black",
            }}
          >
            CSIR IPU Portal
          </Typography>
          <Typography
            level="body-lg"
            sx={{
              mt: 1,
              color: "rgba(0, 0, 0, 0.85)",
              maxWidth: 400,
              mx: { xs: "auto", md: 0 },
            }}
          >
            Securely log in to access your applications, and manage it with
            ease.
          </Typography>
        </Box>

        {/* Right section: Login Form */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <LoginForm />
        </Box>
      </Box>
    </Box>
  );
}
