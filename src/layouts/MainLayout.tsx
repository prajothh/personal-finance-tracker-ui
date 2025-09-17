import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, Container, Toolbar } from "@mui/material";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { motion } from "framer-motion";

export default function MainLayout() {
  const [open, setOpen] = useState(false);
  return (
    <Box display="flex">
      <Navbar onMenu={() => setOpen(true)} />
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <Box component="main" sx={{ flexGrow: 1, minHeight: "100vh", bgcolor: "background.default" }}>
        <Toolbar />
        <Container maxWidth="lg" sx={{ py: 3 }}>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35 }}>
            <Outlet />
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
}
