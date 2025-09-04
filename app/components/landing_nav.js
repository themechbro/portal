import * as React from "react";
import { Container, AppBar, Toolbar, Box, Button } from "@mui/material";
import { Typography } from "@mui/joy";
import { landing_nav_items } from "../misc/landing_nav_items";
import Link from "next/link";

export default function LandingNavbar() {
  return (
    <AppBar
      sx={{
        backgroundColor: "#f5f5f5",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            level="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "black",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: {
                xs: "none",
                md: "flex",
              },
              justifyContent: "space-evenly",
            }}
          >
            {landing_nav_items.map((i) => (
              <Button
                key={i.id}
                startIcon={i.icon}
                component={Link}
                href={`/${i.link}`}
                sx={{
                  backgroundColor: "#e3f2fd",
                  color: "black",
                }}
              >
                {i.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
