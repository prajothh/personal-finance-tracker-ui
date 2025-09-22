import { AppBar, Toolbar, IconButton, Typography, Box, Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/logo.png"; // <-- Add this line

export default function Navbar({ onMenu }: { onMenu: () => void }) {
  return (
    <AppBar position="sticky" color="inherit" elevation={1} sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Toolbar>
        <IconButton edge="start" onClick={onMenu} size="large" sx={{ mr: 1.5 }}>
          <MenuIcon />
        </IconButton>
        {/* Logo and Title */}
        <Box display="flex" alignItems="center" gap={1.5} sx={{ flexGrow: 1 }}>
          <img src={logo} alt="Logo" style={{ height: 54, width: 54, objectFit: "contain" }} />
          <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: .3 }}>
            Personal Finance Tracker
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main", color: "primary.contrastText" }}>P</Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
