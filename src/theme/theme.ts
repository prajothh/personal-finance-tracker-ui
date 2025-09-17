import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#2563eb" },
    secondary: { main: "#22c55e" },
    background: { default: "#f6f8fb", paper: "#ffffff" }
  },
  shape: { borderRadius: 14 },
  components: {
    MuiButton: { styleOverrides: { root: { borderRadius: 12, textTransform: "none" } } },
    MuiCard: { styleOverrides: { root: { borderRadius: 18 } } },
  },
  typography: {
    h4: { fontWeight: 800 },
    h6: { fontWeight: 700 }
  }
});
export default theme;
