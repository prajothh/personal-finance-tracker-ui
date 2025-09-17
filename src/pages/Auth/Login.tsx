// src/pages/Auth/Login.tsx
import { useState } from "react";
import {
  Paper, Stack, TextField, Button, Typography,
  FormControlLabel, Checkbox, InputAdornment, IconButton, Link, Divider,
  Box
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";
import logo from "../../assets/logo.png";

export default function Login() {
  const [showPwd, setShowPwd] = useState(false);
  const togglePwd = () => setShowPwd((s) => !s);

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
              width: 80, // smaller logo
              height:80,
              overflow: "hidden",
              mb: 0.1 // small margin below logo
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

        <Stack spacing={2} component="form" onSubmit={(e) => e.preventDefault()}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            autoComplete="email"
            placeholder="you@example.com"
          />

          <TextField
            label="Password"
            type={showPwd ? "text" : "password"}
            fullWidth
            autoComplete="current-password"
            placeholder="••••••••"
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

          <Button
            type="submit"
            variant="contained"
            size="large"
            startIcon={<LoginIcon />}
            sx={{ py: 1.2, borderRadius: 2 }}
          >
            Sign in
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
