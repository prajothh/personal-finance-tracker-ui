import { useRef } from "react";
import {
  Box,
  Button,
  Typography,
  AppBar,
  Toolbar,
  Link as MuiLink,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import illustration from "../../assets/landing.png";
import landingLogo from "../../assets/logo.png";
import { motion } from "framer-motion";

const navLinks = [
  { label: "Home", to: "home" },
  { label: "About", to: "about" },
  { label: "Team", to: "team" },
  { label: "Contact", to: "contact" },
];

const LandingPage = () => {
  // Persistent refs object
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({
    home: null,
    about: null,
    team: null,
    contact: null,
  });

  // Set ref callback for each section
  const setSectionRef = (key: string) => (node: HTMLDivElement | null) => {
    sectionRefs.current[key] = node;
  };

  // Smooth scroll to section
  const scrollToSection = (key: string) => {
    const ref = sectionRefs.current[key];
    if (ref) {
      ref.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Animation variants for sections
  const sectionVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" as const }, // easeInOut cubic-bezier
    },
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f7faff" }}>
      {/* Navbar */}
      <AppBar
        position="sticky"
        color="transparent"
        elevation={2}
        sx={{
          px: { xs: 1, md: 4 },
          pt: 2,
          bgcolor: "#fff",
          zIndex: 1201,
          boxShadow: "0 2px 8px rgba(25, 118, 210, 0.04)",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            justifyContent: "space-between",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <img
              src={landingLogo}
              alt="Personal Finance Tracker Logo"
              style={{
                height: 48,
                width: 48,
                marginRight: 12,
                objectFit: "contain",
              }}
            />
            <Typography
              variant="h4"
              fontWeight={800}
              sx={{
                letterSpacing: 1,
                color: "#1a237e",
                fontFamily: "inherit",
                fontSize: { xs: "1.5rem", md: "2.2rem" },
              }}
            >
              PERSONAL FINANCE TRACKER
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            gap={{ xs: 1, md: 3 }}
            sx={{ mt: { xs: 2, md: 0 } }}
          >
            {navLinks.map((nav) => (
              <MuiLink
                key={nav.label}
                component="button"
                underline="none"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: 16, md: 20 },
                  color: "#1a237e",
                  fontFamily: "inherit",
                  letterSpacing: 1,
                  transition: "color 0.2s",
                  "&:hover": { color: "#1976d2" },
                }}
                onClick={() => scrollToSection(nav.to)}
              >
                {nav.label}
              </MuiLink>
            ))}
            <Button
              variant="contained"
              color="primary"
              sx={{
                borderRadius: 2,
                fontWeight: 700,
                px: 3,
                mr: 1,
                fontSize: { xs: 14, md: 16 },
              }}
              href="/login"
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{
                borderRadius: 2,
                fontWeight: 700,
                px: 3,
                fontSize: { xs: 14, md: 16 },
              }}
              href="/signup"
            >
              Signup
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <motion.div
        ref={setSectionRef("home")}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariant}
        style={{
          display: "flex",
          flexDirection: window.innerWidth < 900 ? "column" : "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: window.innerWidth < 900 ? 16 : 64,
          paddingRight: window.innerWidth < 900 ? 16 : 64,
          paddingTop: window.innerWidth < 900 ? 32 : 64,
          paddingBottom: window.innerWidth < 900 ? 32 : 0,
        }}
      >
        {/* Left: Text */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ flex: 1, marginBottom: 32 }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              color: "#1a237e",
              fontSize: { xs: "2.2rem", md: "3.2rem" },
              mb: 2,
              lineHeight: 1.1,
              fontFamily: "inherit",
              letterSpacing: 1,
            }}
          >
            Take control of your <br />
            <Box component="span" sx={{ color: "#1976d2" }}>
              Finances
            </Box>{" "}
            with <Box component="span" sx={{ color: "#1976d2" }}>PennyPath</Box>
          </Typography>
          <Typography
            sx={{
              color: "#444",
              fontSize: { xs: "1.1rem", md: "1.3rem" },
              mb: 4,
              maxWidth: 500,
              fontFamily: "inherit",
            }}
          >
            Track your <b>income</b>, <b>expenses</b> and <b>savings</b> effortlessly. Set and achieve financial goals. Get insights and reports to manage your finances like a pro.
          </Typography>
          <Box display="flex" gap={2}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                borderRadius: 3,
                fontWeight: 700,
                px: 4,
                boxShadow: 2,
                fontSize: { xs: 14, md: 16 },
              }}
              href="/signup"
              endIcon={<ArrowForwardIcon />}
            >
              Get Started
            </Button>
          </Box>
        </motion.div>
        {/* Right: Illustration */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={illustration}
            alt="Finance Illustration"
            style={{
              width: "100%",
              maxWidth: 650,
              height: "auto",
              borderRadius: 0,
              boxShadow: "none",
              background: "none",
            }}
          />
        </motion.div>
      </motion.div>

      {/* About Section */}
      <motion.div
        ref={setSectionRef("about")}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariant}
        style={{
          paddingLeft: window.innerWidth < 900 ? 16 : 64,
          paddingRight: window.innerWidth < 900 ? 16 : 64,
          paddingTop: 64,
          paddingBottom: 64,
          background: "#fff",
        }}
      >
        <Typography variant="h3" fontWeight={700} color="#1976d2" mb={2}>
          About
        </Typography>
        <Typography sx={{ fontSize: 18, color: "#333", maxWidth: 800 }}>
          PennyPath is a modern personal finance tracker designed to help you manage your money with ease. Our mission is to empower you to make smarter financial decisions, save more, and achieve your goals.
        </Typography>
      </motion.div>

      {/* Team Section */}
      <motion.div
        ref={setSectionRef("team")}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariant}
        style={{
          paddingLeft: window.innerWidth < 900 ? 16 : 64,
          paddingRight: window.innerWidth < 900 ? 16 : 64,
          paddingTop: 64,
          paddingBottom: 64,
          background: "#f7faff",
        }}
      >
        <Typography variant="h3" fontWeight={700} color="#1976d2" mb={2}>
          Team
        </Typography>
        <Typography sx={{ fontSize: 18, color: "#333", maxWidth: 800 }}>
          Our team is made up of passionate finance and technology enthusiasts who believe everyone deserves financial clarity and peace of mind.
        </Typography>
      </motion.div>

      {/* Contact Section */}
      <motion.div
        ref={setSectionRef("contact")}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariant}
        style={{
          paddingLeft: window.innerWidth < 900 ? 16 : 64,
          paddingRight: window.innerWidth < 900 ? 16 : 64,
          paddingTop: 64,
          paddingBottom: 64,
          background: "#fff",
        }}
      >
        <Typography variant="h3" fontWeight={700} color="#1976d2" mb={2}>
          Contact Us
        </Typography>
        <Typography sx={{ fontSize: 18, color: "#333", maxWidth: 800 }}>
          Email: support@PennyPath.com<br />
          Phone: +91-1234567890<br />
          We'd love to hear from you!
        </Typography>
      </motion.div>
    </Box>
  );
};

export default LandingPage;
