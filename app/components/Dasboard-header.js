"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  Divider,
} from "@mui/material";
import {
  DarkMode,
  LightMode,
  NotificationsNoneOutlined,
} from "@mui/icons-material";
import { Bug, Info } from "lucide-react";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardHeader() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationClick = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST_IP}/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Logout failed");
      }
      // Redirect to login
      router.push("/Login");
      router.refresh(); // Optional: Force refresh for clean state
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleReportaProblem = () => {
    router.push("/report-a-problem");
    setAnchorEl(null);
  };

  const handleAboutSite = () => {
    router.push("/about");
    setAnchorEl(null);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };
  const getFormattedDate = () => {
    const date = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST_IP}/user-details`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          console.log("User data fetched:", data);
        } else {
          console.error("Failed to fetch user data.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUser();
  }, []);

  // Empty dependency array ensures this runs only once on mount

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: {
          md: "row",
          xs: "column",
        },
        justifyContent: "space-between",
        alignItems: "center",
        px: 4,
        pt: 2,
        pb: 3,
        borderBottom: "1px solid",
        borderColor: "rgba(0,0,0,0.1)",
        backgroundColor: "#FFF",
        transition: "background-color 0.5s ease-in",
      }}
    >
      {/* Welcome back */}
      <Box>
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Roboto Condensed",
            fontWeight: 600,
            color: "#1e293b",
            mb: 0.5,
          }}
        >
          Welcome back, {userData.username}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#64748b",
          }}
        >
          {getFormattedDate()}
        </Typography>
      </Box>
      {/* search */}
      {/* <SearchBar darkMode={isDarkMode} /> */}

      {/* notif, profile dropdown */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          flexDirection: {
            md: "row",
            xs: "row",
          },
          mt: {
            xs: 2,
            md: 0,
          },
        }}
      >
        {/* Notifications */}
        <Tooltip title="Notifications">
          <IconButton
            onClick={handleNotificationClick}
            sx={{
              color: "#64748b",
              position: "relative",
            }}
          >
            <NotificationsNoneOutlined />
            <Box
              sx={{
                position: "absolute",
                top: 4,
                right: 4,
                width: 8,
                height: 8,
                bgcolor: "#ef4444",
                borderRadius: "50%",
              }}
            />
          </IconButton>
        </Tooltip>

        {/* Profile Menu */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar
            onClick={handleProfileClick}
            sx={{
              cursor: "pointer",
              bgcolor: "#6366f1",
              "&:hover": { opacity: 0.9 },
            }}
          >
            {userData.username}
          </Avatar>
        </Box>
      </Box>

      {/* Profile Dropdown */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 200,
            borderRadius: 2,
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          },
        }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {userData.username}
          </Typography>
          <Typography variant="body2" sx={{ color: "#64748b" }}>
            {userData.email}
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <MenuItem onClick={handleReportaProblem}>
          <Bug fontSize="small" sx={{ ml: 3 }} /> Report a Problem
        </MenuItem>
        <MenuItem onClick={handleAboutSite}>
          <Info fontSize="small" sx={{ ml: 3 }} /> About Site
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <LogOut fontSize="small" sx={{ ml: 3 }} /> Logout
        </MenuItem>
      </Menu>

      {/* Notifications Dropdown */}
      <Menu
        anchorEl={notificationAnchor}
        open={Boolean(notificationAnchor)}
        onClose={handleNotificationClose}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 320,
            borderRadius: 2,
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
            Notifications
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <NotificationItem
              title="New Case Assigned"
              description="You have been assigned to Case #1234"
              time="5 minutes ago"
            />
            <NotificationItem
              title="Document Update"
              description="Case #1001 documents have been updated"
              time="1 hour ago"
            />
            <NotificationItem
              title="Meeting Reminder"
              description="Client meeting scheduled for tomorrow"
              time="2 hours ago"
            />
          </Box>
        </Box>
      </Menu>
    </Box>
  );
}

// Helper component for notification items
function NotificationItem({ title, description, time }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ color: "#64748b" }}>
        {description}
      </Typography>
      <Typography variant="caption" sx={{ color: "#94a3b8" }}>
        {time}
      </Typography>
    </Box>
  );
}
