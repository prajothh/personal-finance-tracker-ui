// src/pages/Goals/Goals.tsx
import { useState, useEffect } from "react";
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  LinearProgress,
  Stack,
  CircularProgress,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import { getGoals, addGoal } from "../../services/api";
import type { GoalResponse } from "../../types/Interface";

const Goals = () => {
  const [goals, setGoals] = useState<GoalResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [targetAmount, setTargetAmount] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [notes, setNotes] = useState("");
  const [adding, setAdding] = useState(false);

  const accessToken = localStorage.getItem("token") || ""; // <-- Fix: use "token" key

  // Fetch goals on mount
  useEffect(() => {
    async function fetchGoals() {
      setLoading(true);
      setError(null);
      try {
        const data = await getGoals(accessToken);
        setGoals(data);
      } catch (err: any) {
        if (err.message.includes("401")) {
          setError("Session expired. Please login again.");
          // Optionally redirect to login
          // window.location.href = "/login";
        } else {
          setError(err.message || "Failed to load goals");
        }
      }
      setLoading(false);
    }
    fetchGoals();
  }, [accessToken]);

  // Add goal handler
  async function handleAddGoal() {
    if (!targetAmount || !targetDate) {
      setError("Please fill all required fields.");
      return;
    }
    setAdding(true);
    setError(null);
    try {
      const newGoal = await addGoal(
        {
          target_amount: Number(targetAmount),
          target_date: targetDate,
          notes: notes || undefined,
        },
        accessToken
      );
      setGoals([...goals, newGoal]);
      setTargetAmount("");
      setTargetDate("");
      setNotes("");
    } catch (err: any) {
      setError(err.message || "Failed to add goal");
    }
    setAdding(false);
  }

  return (
    <Box sx={{ padding: 4, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" fontWeight="bold" align="center" mb={4}>
          Savings Goals
        </Typography>
      </motion.div>

      {/* Error & Loading */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {loading && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}

      {/* Add Goal Form */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card sx={{ padding: 3, marginBottom: 4, maxWidth: 600, mx: "auto" }}>
          <Stack spacing={2}>
            <Typography variant="h6">Create New Goal</Typography>
            <TextField
              fullWidth
              label="Target Amount"
              placeholder="$500"
              type="number"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
            />
            <TextField
              fullWidth
              type="date"
              label="Target Date"
              InputLabelProps={{ shrink: true }}
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
            />
            <TextField
              fullWidth
              label="Notes (Optional)"
              placeholder="Add a note"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddGoal}
              disabled={adding}
            >
              {adding ? "Adding..." : "Add Goal"}
            </Button>
          </Stack>
        </Card>
      </motion.div>

      {/* Goals List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Stack spacing={3}>
          {goals.map((goal) => (
            <motion.div
              key={goal.goal_id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Card sx={{ padding: 3, maxWidth: 600, mx: "auto" }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Target: ${goal.target_amount} by {goal.target_date}
                </Typography>
                {goal.notes && (
                  <Typography variant="body2" color="textSecondary">
                    Notes: {goal.notes}
                  </Typography>
                )}
                <Box mt={2}>
                  <LinearProgress
                    variant="determinate"
                    value={goal.progress}
                    sx={{ height: 10, borderRadius: 5 }}
                  />
                  <Typography variant="caption" mt={1}>
                    Progress: {goal.progress}%
                  </Typography>
                </Box>
              </Card>
            </motion.div>
          ))}
        </Stack>
      </motion.div>
    </Box>
  );
};

export default Goals;
