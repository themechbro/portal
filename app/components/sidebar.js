"use client";
import { Divider, Drawer, Toolbar } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Link from "next/link";
import { options } from "../misc/options-drawer";
import Image from "next/image";
import csirLogo from "@/public/assets/logo.png";
import { Typography, Box } from "@mui/material";
import { useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, Tooltip } from "@mui/material";
// import LogoutButton from "./logout-button";
import { usePathname } from "next/navigation";

const drawerWidth = 240;

export default function Sidebar() {
  const params = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [toggle, setToggle] = useState(false);

  const handleClick = () => {
    setIsOpen(false);
    setToggle(true);
  };

  const handleClick2 = () => {
    setIsOpen(true);
    setToggle(false);
  };
  return (
    <Drawer
      sx={{
        width: isOpen ? drawerWidth : 72,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isOpen ? drawerWidth : 72,
          transition: "width 0.3s ease-in-out",
          boxSizing: "border-box",
          backgroundColor: "#f8fafc",
          transition: "background-color 0.5s ease-in",
          borderRight: "1px solid rgba(0, 0, 0, 0.08)",
          boxShadow: isOpen ? "4px 0 8px rgba(0, 0, 0, 0.05)" : "none",
          overflowX: "hidden",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar
        sx={{
          minHeight: "80px",
          padding: "16px",
          backgroundColor: "white",
          transition: "background-color 0.5s ease-in",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: isOpen ? "space-between" : "center",
            backgroundColor: "#fff",
            transition: "background-color 0.5s ease-in",
          }}
        >
          {isOpen ? (
            <>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Image
                  src={csirLogo}
                  alt="logo"
                  width={50}
                  height={50}
                  style={{ borderRadius: "8px" }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "Roboto Condensed",
                    fontWeight: 600,
                    color: "#64748b",
                  }}
                >
                  Patent Filing Portal
                </Typography>
              </Box>
              <IconButton
                // onClick={() => setIsOpen(false)}
                onClick={handleClick}
                sx={{
                  "&:hover": {
                    backgroundColor: "#f1f5f9",
                  },
                }}
              >
                <ChevronLeftIcon />
              </IconButton>
            </>
          ) : (
            <IconButton
              // onClick={() => setIsOpen(true)}
              onClick={handleClick2}
              sx={{
                "&:hover": {
                  backgroundColor: "#f1f5f9",
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>
      <Divider sx={{ borderColor: "rgba(0, 0, 0, 0.08)" }} />
      <List sx={{ padding: "8px" }}>
        {options.map((item) => {
          const isActive = params === item.link;
          return (
            <Tooltip
              key={item.name}
              title={item.tooltip}
              placement="right"
              arrow
              disableInteractive
              enterDelay={500}
              leaveDelay={200}
            >
              <ListItem
                disablePadding
                sx={{
                  mb: 1,
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                <Link
                  href={item.link}
                  style={{
                    textDecoration: "none",
                    width: "100%",
                  }}
                >
                  <ListItemButton
                    sx={{
                      borderRadius: "8px",
                      "&:hover": {
                        backgroundColor: isActive ? "#1565c0" : "#e2e8f0",
                      },
                      minHeight: "48px",
                      backgroundColor: isActive ? "#1976d2" : "transparent", // Explicitly set the background color
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: isOpen ? "56px" : "24px",
                        color: isActive ? "#fff" : "#64748b",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    {isOpen && (
                      <ListItemText
                        primary={item.name}
                        sx={{
                          "& .MuiListItemText-primary": {
                            color: isActive ? "#000000ff" : "#4d4c50ff",
                            fontWeight: 500,
                          },
                        }}
                      />
                    )}
                  </ListItemButton>
                </Link>
              </ListItem>
            </Tooltip>
          );
        })}
      </List>
      <Divider sx={{ borderColor: "rgba(0, 0, 0, 0.08)" }} />
    </Drawer>
  );
}
