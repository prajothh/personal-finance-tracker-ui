import { useState } from "react";
import {
  Paper, Stack, TextField, Button, Typography,
  FormControlLabel, Checkbox, InputAdornment, IconButton, Link, Divider,
  Box, LinearProgress
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import logo from "../../assets/logo.png";

function getPasswordStrength(password: string) {
  let score = 0;
  if (password.length > 7) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score <= 2) return { label: "Weak", value: 20, color: "error" as const };
  if (score === 3) return { label: "Medium", value: 60, color: "warning" as const };
  return { label: "Strong", value: 100, color: "success" as const };
}

export default function Signup() {
  const [showPwd, setShowPwd] = useState(false);
  const [password, setPassword] = useState("");
  const togglePwd = () => setShowPwd((s) => !s);

  const strength = getPasswordStrength(password);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f5f7fa",
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
        <Stack spacing={0} alignItems="center" mb={2}>
          <Box
            sx={{
              width: 80, // smaller logo
              height: 80,
              borderRadius: 2,
              display: "grid",
              placeItems: "center",
              overflow: "hidden",
              mb: 0.1 // small margin below logo
            }}
          >
            <img src={logo} alt="Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </Box>
          <Typography variant="h5" fontWeight={700} textAlign="center">
            Create your account
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            Start tracking income, expenses & goals.
          </Typography>
        </Stack>

        <Stack spacing={2} component="form" onSubmit={(e) => e.preventDefault()}>
          <TextField
            label="Full name"
            type="text"
            fullWidth
            autoComplete="name"
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            autoComplete="email"
          />
          <TextField
            label="Password"
            type={showPwd ? "text" : "password"}
            fullWidth
            autoComplete="new-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
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
          {/* Password strength animation */}
          <Box sx={{ mt: -1, mb: 1 }}>
            <LinearProgress
              variant="determinate"
              value={strength.value}
              color={strength.color}
              sx={{ height: 8, borderRadius: 5 }}
            />
            <Typography variant="caption" color={strength.color + ".main"}>
              Password strength: {strength.label}
            </Typography>
          </Box>
          <TextField
            label="Confirm password"
            type="password"
            fullWidth
            autoComplete="new-password"
          />

          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="I agree to the Terms & Privacy"
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            startIcon={<PersonAddIcon />}
            sx={{ py: 1.2, borderRadius: 2 }}
          >
            Create account
          </Button>

          <Divider flexItem />

          <Typography variant="body2" color="text.secondary" textAlign="center">
            Already have an account?{" "}
            <Link href="/login" underline="hover">Sign in</Link>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}
