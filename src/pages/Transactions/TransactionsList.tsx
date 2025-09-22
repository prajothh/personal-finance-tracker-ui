// src/pages/Transactions/TransactionsList.tsx

import {
  Box,
  Card,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Pagination,
  Stack,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTransactions, getTransactionsByDate } from "../../services/api";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import type { AddTransactionResponse } from "../../types/Interface";

const TransactionsList = () => {
  const [transactions, setTransactions] = useState<AddTransactionResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [filterType, setFilterType] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const accessToken = localStorage.getItem("token") || "";
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setApiError(null);
      try {
        let data;
        if (searchDate) {
          data = await getTransactionsByDate(accessToken, searchDate);
        } else {
          data = await getTransactions(accessToken);
        }
        setTransactions(data);
      } catch (err: any) {
        setApiError(err.message || "Failed to fetch transactions");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [accessToken, searchDate]);

  const filteredTransactions = transactions.filter(
    (tx) => filterType === "" || tx.type === filterType
  );

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <Navbar onMenu={() => setSidebarOpen(true)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <Box sx={{ padding: 4, maxWidth: 1200, mx: "auto" }}>
        <Typography variant="h4" mb={4} fontWeight="bold" align="center">
          Transactions
        </Typography>

        {/* Filters */}
        <Box display="flex" gap={2} flexWrap="wrap" alignItems="center" mb={3}>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Type</InputLabel>
            <Select
              value={filterType}
              label="Type"
              onChange={(e) => setFilterType(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Income">Income</MenuItem>
              <MenuItem value="Expense">Expense</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Search by Date"
            type="date"
            variant="outlined"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            sx={{ minWidth: 200 }}
            InputLabelProps={{ shrink: true }}
          />

          <Box flexGrow={1} />
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/transactions/add")}
            sx={{ height: "56px" }}
          >
            Add Transaction
          </Button>
        </Box>

        {/* Transaction Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <TableContainer component={Paper}>
              <Table>
                <TableHead sx={{ backgroundColor: "#1976d2" }}>
                  <TableRow>
                    <TableCell sx={{ color: "#fff" }}>Date</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Category</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Type</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Amount</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Notes</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredTransactions.length === 0 && !loading ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        <Typography color="text.secondary" py={3}>
                          No records found
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTransactions.map((tx) => (
                      <motion.tr
                        key={tx.transaction_id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <TableCell>{tx.transaction_date}</TableCell>
                        <TableCell>{tx.category}</TableCell>
                        <TableCell>{tx.type}</TableCell>
                        <TableCell>${tx.amount}</TableCell>
                        <TableCell>{tx.notes}</TableCell>
                      </motion.tr>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </motion.div>

        {loading && (
          <Box display="flex" justifyContent="center" my={4}>
            <Typography color="primary">Loading...</Typography>
          </Box>
        )}

        {apiError && (
          <Box display="flex" justifyContent="center" my={2}>
            <Typography color="error">{apiError}</Typography>
          </Box>
        )}

        {/* Pagination */}
        <Box display="flex" justifyContent="center" mt={3}>
          <Stack spacing={2}>
            <Pagination count={10} color="primary" />
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default TransactionsList;
