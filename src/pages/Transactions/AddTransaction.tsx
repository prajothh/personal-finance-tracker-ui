import {
  Box,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  InputAdornment,
  Card,
} from "@mui/material";
import { useState } from "react";
import { motion } from "framer-motion";
import { addTransaction } from "../../services/api";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";


const AddTransaction = () => {
  const [amount, setAmount] = useState<number | "">("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [notes, setNotes] = useState("");
  const [transactionDate, setTransactionDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);


  // Get token from localStorage (or context)
  const accessToken = localStorage.getItem("token") || "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    setSuccess(null);

    if (!amount || !category || !type || !transactionDate) {
      setApiError("Please fill all required fields.");
      return;
    }

    setLoading(true);
    try {
      await addTransaction(
        {
          amount: Number(amount),
          category,
          type,
          notes,
          transaction_date: transactionDate,
        },
        accessToken
      );
      setSuccess("Transaction added successfully!");
      setAmount("");
      setCategory("");
      setType("");
      setNotes("");
      setTransactionDate("");
    } catch (err: any) {
      setApiError(err.message || "Failed to add transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <Navbar onMenu={() => setSidebarOpen(true)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Page Content */}
      <Box sx={{ padding: 4, maxWidth: 700, mx: "auto" }}>
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h4" mb={4} fontWeight="bold" align="center">
            Add New Transaction
          </Typography>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card sx={{ padding: 4, maxWidth: 700, margin: "0 auto" }}>
            {/* Form Layout with Flexbox */}
            <Box
              component="form"
              display="flex"
              flexDirection="column"
              gap={3}
              alignItems="center"
              onSubmit={handleSubmit}
            >
              {/* Amount Field */}
              <TextField
                fullWidth
                label="Amount"
                variant="outlined"
                placeholder="Enter amount"
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                required
              />

              {/* Category Field */}
              <TextField
                fullWidth
                label="Category"
                variant="outlined"
                placeholder="Enter category"
                value={category}
                onChange={e => setCategory(e.target.value)}
                required
              />

              {/* Type Field */}
              <FormControl fullWidth required>
                <InputLabel>Type</InputLabel>
                <Select
                  value={type}
                  label="Type"
                  onChange={e => setType(e.target.value)}
                >
                  <MenuItem value="Income">Income</MenuItem>
                  <MenuItem value="Expense">Expense</MenuItem>
                </Select>
              </FormControl>

              {/* Notes Field */}
              <TextField
                fullWidth
                label="Notes"
                variant="outlined"
                multiline
                rows={4}
                placeholder="Add optional notes"
                value={notes}
                onChange={e => setNotes(e.target.value)}
              />

              {/* Transaction Date Field */}
              <TextField
                fullWidth
                label="Transaction Date"
                type="date"
                variant="outlined"
                value={transactionDate}
                onChange={e => setTransactionDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
              />

              {/* API Error Message */}
              {apiError && (
                <Typography color="error" align="center">
                  {apiError}
                </Typography>
              )}

              {/* Success Message */}
              {success && (
                <Typography color="success.main" align="center">
                  {success}
                </Typography>
              )}

              {/* Submit Button */}
              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                sx={{
                  fontWeight: "bold",
                  paddingY: 1.5,
                  "&:hover": { backgroundColor: "#1976d2" },
                }}
                type="submit"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Transaction"}
              </Button>
            </Box>
          </Card>
        </motion.div>
      </Box>
    </Box>
  );
};

export default AddTransaction;
