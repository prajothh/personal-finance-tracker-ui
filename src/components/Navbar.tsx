import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  Stack,
  useTheme,
  Paper,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar({ onMenu }: { onMenu: () => void }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const userName = localStorage.getItem("user_name") || "User";
  const userEmail = localStorage.getItem("user_email") || "user@email.com";
  const avatarLetter = userName.charAt(0).toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setOpen(false);
    navigate("/login", { replace: true });
  };

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={3}
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        background: "#fff",
      }}
    >
      <Toolbar>
        {/* Menu Icon */}
        <IconButton
          edge="start"
          onClick={onMenu}
          size="large"
          sx={{
            mr: 2,
            color: theme.palette.primary.main,
            "&:hover": { backgroundColor: "rgba(25, 118, 210, 0.08)" },
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* Logo and Title */}
        <Box display="flex" alignItems="center" gap={1.5} sx={{ flexGrow: 1 }}>
          <img
            src={logo}
            alt="Logo"
            style={{
              height: 50,
              width: 50,
              objectFit: "contain",
              borderRadius: 8,
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            }}
          />
          <Typography
            variant="h6"
            sx={{ fontWeight: 800, letterSpacing: 0.3, color: "#1976d2" }}
          >
            Personal Finance Tracker
          </Typography>
        </Box>

        {/* Logout Button */}
        <Box display="flex" alignItems="center">
          <IconButton
            onClick={() => setOpen(true)}
            sx={{
              borderRadius: 2,
              padding: 1,
              "&:hover": { backgroundColor: "rgba(25, 118, 210, 0.1)" },
            }}
          >
            <LogoutIcon sx={{ width: 34, height: 34, color: "#d32f2f" }} />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Account Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperComponent={(props) => (
          <Paper
            {...props}
            sx={{
              borderRadius: 3,
              padding: 2,
              background: "linear-gradient(145deg, #f7f7f7, #e0e0e0)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            }}
          />
        )}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: 700,
            fontSize: 22,
            color: theme.palette.primary.main,
            pb: 0,
          }}
        >
          Account Details
        </DialogTitle>
        <Divider sx={{ mb: 1 }} />
        <DialogContent>
          <Stack alignItems="center" spacing={2} py={2}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: theme.palette.primary.main,
                color: "#fff",
                fontSize: 36,
                mb: 1,
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              }}
            >
              {avatarLetter}
            </Avatar>
            <Typography variant="h6" fontWeight={700}>
              {userName}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 1, fontStyle: "italic" }}
            >
              {userEmail}
            </Typography>
            <Box display="flex" alignItems="center" gap={1} color="success.main">
              <PersonIcon fontSize="small" />
              <Typography variant="caption" color="success.main">
                Logged in
              </Typography>
            </Box>
          </Stack>
        </DialogContent>
        <Divider />
        <DialogActions sx={{ justifyContent: "center", pb: 2, pt: 1 }}>
          <Button
            onClick={handleLogout}
            color="error"
            variant="contained"
            size="large"
            startIcon={<LogoutIcon />}
            sx={{
              minWidth: 120,
              fontWeight: 700,
              borderRadius: 3,
              background: "linear-gradient(135deg, #f44336, #d32f2f)",
            }}
          >
            Logout
          </Button>
          <Button
            onClick={() => setOpen(false)}
            color="primary"
            variant="outlined"
            size="large"
            sx={{
              minWidth: 120,
              fontWeight: 700,
              borderRadius: 3,
              borderWidth: 2,
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
}
