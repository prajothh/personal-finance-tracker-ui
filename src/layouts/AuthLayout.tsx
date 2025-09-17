import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { motion } from "framer-motion";

export default function AuthLayout() {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      sx={{ width: "100%" }}
    >
      <Outlet />
    </Box>
  );
}
