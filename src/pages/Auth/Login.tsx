// src/pages/Auth/Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Paper, Stack, TextField, Button, Typography,
  FormControlLabel, Checkbox, InputAdornment, IconButton, Link, Divider,
  Box
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";
import logo from "../../assets/logo.png";
import { loginUser } from "../../services/api";

export default function Login() {
  const [showPwd, setShowPwd] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const togglePwd = () => setShowPwd((s) => !s);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    setSuccess(null);

    setLoading(true);
    try {
      const res = await loginUser({ email, password });
      localStorage.setItem("token", res.access_token); // <-- Save token here
      setSuccess("Login successful!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } catch (err: any) {
      setApiError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f5f7fa", // matches your index.css
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: { xs: 3, sm: 4 },
          borderRadius: 3,
          maxWidth: 400,
          width: "100%",
        }}
      >
        {/* brand / heading */}
        <Stack spacing={0} alignItems="center" mb={2}>
          <Box
            sx={{
              width: 80,
              height: 80,
              overflow: "hidden",
              mb: 0.1
            }}
          >
            <img src={logo} alt="Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </Box>
          <Typography
            variant="h5"
            fontWeight={700}
            textAlign="center"
          >
            Sign in to your account
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            Manage your personal finances smartly.
          </Typography>
        </Stack>

        <Stack spacing={2} component="form" onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <TextField
            label="Password"
            type={showPwd ? "text" : "password"}
            fullWidth
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password" onClick={togglePwd} edge="end">
                    {showPwd ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />
            <Link href="#" underline="hover">Forgot password?</Link>
          </Stack>

          {apiError && (
            <Typography color="error" variant="body2" textAlign="center">
              {apiError}
            </Typography>
          )}
          {success && (
            <Typography color="success.main" variant="body2" textAlign="center">
              {success}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            size="large"
            startIcon={<LoginIcon />}
            sx={{ py: 1.2, borderRadius: 2 }}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>

          <Divider flexItem />

          <Typography variant="body2" color="text.secondary" textAlign="center">
            Don’t have an account?{" "}
            <Link href="/signup" underline="hover">Create one</Link>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}
