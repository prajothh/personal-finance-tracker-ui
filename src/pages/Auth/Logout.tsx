import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      localStorage.removeItem("token");
      navigate("/login", { replace: true });
    } else {
      // If not logged in, redirect to dashboard or prevent access
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  return null;
}