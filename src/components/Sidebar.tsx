import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AddIcon from "@mui/icons-material/Add";
import FlagIcon from "@mui/icons-material/Flag";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { useLocation, useNavigate } from "react-router-dom";

const WIDTH = 260;
const items = [
  { to: "/", label: "Dashboard", icon: <DashboardIcon /> },
  { to: "/transactions", label: "Transactions", icon: <ReceiptLongIcon /> },
  { to: "/transactions/add", label: "Add Transaction", icon: <AddIcon /> },
  { to: "/goals", label: "Savings Goals", icon: <FlagIcon /> },
  { to: "/reports", label: "Reports", icon: <AssessmentIcon /> },
];

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void; }) {
  const nav = useNavigate();
  const { pathname } = useLocation();
  return (
    <Drawer open={open} onClose={onClose} variant="temporary"
      sx={{ "& .MuiDrawer-paper": { width: WIDTH } }}>
      <Toolbar />
      <List>
        {items.map(it => (
          <ListItemButton key={it.to} selected={pathname === it.to}
            onClick={() => { nav(it.to); onClose(); }}>
            <ListItemIcon>{it.icon}</ListItemIcon>
            <ListItemText primary={it.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
