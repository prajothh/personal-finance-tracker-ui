import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AddIcon from "@mui/icons-material/Add";
import FlagIcon from "@mui/icons-material/Flag";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; // <-- Your logo path

const WIDTH = 260;

const items = [
  { to: "/dashboard", label: "Dashboard", icon: <DashboardIcon /> },
  { to: "/transactions", label: "Transactions", icon: <ReceiptLongIcon /> },
  { to: "/transactions/add", label: "Add Transaction", icon: <AddIcon /> },
  { to: "/goals", label: "Savings Goals", icon: <FlagIcon /> },
  { to: "/reports", label: "Reports", icon: <AssessmentIcon /> },
];

export default function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { pathname } = useLocation();
  const nav = useNavigate();

  return (
    <Drawer
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: WIDTH, bgcolor: "#fff", borderRight: "1px solid #e0e0e0" },
      }}
    >
      {/* Logo and Close Button */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 2,
          borderBottom: "1px solid #e0e0e0",
          gap: 1, // add a small gap
        }}
      >
        <img
          src={logo}
          alt="Sidebar Logo"
          style={{
            height: 60,
            width: 110, // wider logo
            objectFit: "contain",
            display: "block",
          }}
        />
        <IconButton onClick={onClose} sx={{ color: "#222" }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Menu Items */}
      <List sx={{ mt: 1 }}>
        {items.map((it) => (
          <ListItemButton
            key={it.to}
            selected={
              pathname === it.to ||
              (it.to === "/transactions" && pathname.startsWith("/transactions"))
            }
            onClick={() => {
              nav(it.to);
              onClose();
            }}
            sx={{
              borderRadius: 2,
              mx: 1,
              mb: 0.5,
              "&.Mui-selected": {
                bgcolor: "#e3f2fd",
                color: "#1976d2",
                fontWeight: 700,
              },
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>{it.icon}</ListItemIcon>
            <ListItemText primary={it.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}