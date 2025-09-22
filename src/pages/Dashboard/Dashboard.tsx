// src/pages/Dashboard/Dashboard.tsx


import { useState } from "react";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { motion } from "framer-motion";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import SavingsIcon from "@mui/icons-material/Savings";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

// Register the required Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const pieData = {
  labels: ["Income", "Expense", "Savings"],
  datasets: [
    {
      data: [3000, 2000, 500],
      backgroundColor: ["#4caf50", "#f44336", "#2196f3"],
      borderWidth: 2,
    },
  ],
};

const statCards = [
  {
    label: "Total Income",
    value: "$3,000",
    icon: <TrendingUpIcon sx={{ fontSize: { xs: 32, sm: 40 }, color: "#4caf50" }} />,
    gradient: "linear-gradient(135deg, #e0f7fa 0%, #b2dfdb 100%)",
  },
  {
    label: "Total Expense",
    value: "$2,000",
    icon: <TrendingDownIcon sx={{ fontSize: { xs: 32, sm: 40 }, color: "#f44336" }} />,
    gradient: "linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)",
  },
  {
    label: "Net Savings",
    value: "$1,000",
    icon: <SavingsIcon sx={{ fontSize: { xs: 32, sm: 40 }, color: "#2196f3" }} />,
    gradient: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
  },
];

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "linear-gradient(135deg, #f5f7fa 0%, #e3f0ff 100%)" }}>
      {/* Navbar */}
      <Navbar onMenu={() => setSidebarOpen(true)} />

      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <Box sx={{ p: { xs: 1, sm: 3 }, maxWidth: 1200, mx: "auto" }}>
        {/* Stat Cards - horizontal scroll on mobile */}
        <Box sx={{
          overflowX: { xs: "auto", sm: "visible" },
          mb: 4,
        }}>
          <Stack
            direction={{ xs: "row", sm: "row" }}
            spacing={3}
            justifyContent="center"
            alignItems="stretch"
            sx={{
              minWidth: { xs: 700, sm: "auto" },
            }}
          >
            {statCards.map((card, idx) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                style={{ flex: 1, minWidth: 220 }}
              >
                <Card
                  sx={{
                    p: { xs: 2, sm: 3 },
                    minWidth: 220,
                    borderRadius: 4,
                    boxShadow: 3,
                    background: card.gradient,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "translateY(-6px) scale(1.03)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <Box mb={1}>{card.icon}</Box>
                  <Typography variant="h6" fontWeight={600} color="text.secondary" fontSize={{ xs: 16, sm: 20 }}>
                    {card.label}
                  </Typography>
                  <Typography variant="h4" fontWeight={700} color="text.primary" fontSize={{ xs: 22, sm: 32 }}>
                    {card.value}
                  </Typography>
                </Card>
              </motion.div>
            ))}
          </Stack>
        </Box>

        {/* Pie Chart - responsive width */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          justifyContent="center"
          alignItems="stretch"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{ flex: 1 }}
          >
            <Card
              sx={{
                p: { xs: 2, sm: 3 },
                minWidth: { xs: "100%", sm: 320 },
                borderRadius: 4,
                boxShadow: 3,
                background: "linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" align="center" gutterBottom fontWeight={600} fontSize={{ xs: 16, sm: 20 }}>
                Income vs Expense Breakdown
              </Typography>
              <Box sx={{ width: { xs: 220, sm: 300 }, height: { xs: 220, sm: 300 } }}>
                <Pie data={pieData} />
              </Box>
            </Card>
          </motion.div>
        </Stack>

        {/* Recent Transactions - responsive */}
        <Box mt={5}>
          <Card sx={{ p: { xs: 2, sm: 3 }, borderRadius: 4, boxShadow: 2 }}>
            <Typography variant="h6" fontWeight={600} mb={2} fontSize={{ xs: 16, sm: 20 }}>
              Recent Transactions
            </Typography>
            <Stack spacing={2}>
              <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} justifyContent="space-between">
                <Typography color="success.main" fontSize={{ xs: 15, sm: 18 }}>+ $1,200 Salary</Typography>
                <Typography color="text.secondary" fontSize={{ xs: 13, sm: 16 }}>2025-09-18</Typography>
              </Box>
              <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} justifyContent="space-between">
                <Typography color="error.main" fontSize={{ xs: 15, sm: 18 }}>- $300 Groceries</Typography>
                <Typography color="text.secondary" fontSize={{ xs: 13, sm: 16 }}>2025-09-17</Typography>
              </Box>
              <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} justifyContent="space-between">
                <Typography color="error.main" fontSize={{ xs: 15, sm: 18 }}>- $150 Utilities</Typography>
                <Typography color="text.secondary" fontSize={{ xs: 13, sm: 16 }}>2025-09-16</Typography>
              </Box>
            </Stack>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
