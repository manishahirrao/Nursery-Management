import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Divider,
  IconButton,
  InputAdornment,
  Box,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Google as GoogleIcon,
} from "@mui/icons-material";
import Title from "./Title";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    // For demo purposes, we'll use a simple validation
    // In a real app, this would be an API call to your backend
    if (
      formData.email === "demo@example.com" &&
      formData.password === "password"
    ) {
      // Set user data in localStorage
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userName", "Demo User");

      // Navigate to home page
      navigate("/");
    } else {
      setError("Invalid email or password");
    }
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic here
    console.log("Google login attempt");
  };

  const handleSignUpClick = () => {
    navigate("/register");
  };

  return (
    <Container maxWidth="sm" className="py-8">
      <Paper elevation={3} className="p-6 sm:p-8">
        <Title text1="Welcome Back" />
        <Typography
          variant="body1"
          color="text.secondary"
          className="text-center mb-6"
        >
          Sign in to continue shopping
        </Typography>

        {error && (
          <Typography
            variant="body2"
            color="error"
            className="text-center mb-4"
          >
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            variant="outlined"
            size="small"
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            required
            variant="outlined"
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm text-green-600 hover:text-green-700"
            >
              Forgot Password?
            </Link>
          </div>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="!bg-green-600 hover:!bg-green-700 text-white py-2"
          >
            Sign In
          </Button>
        </form>

        <Divider className="my-6">
          <Typography variant="body2" color="text.secondary">
            OR
          </Typography>
        </Divider>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<GoogleIcon />}
          onClick={handleGoogleLogin}
          className="!border-gray-300 hover:!bg-gray-50"
        >
          Continue with Google
        </Button>

        <div className="mt-6 text-center">
          <Typography variant="body2" color="text.secondary">
            Don't have an account?{" "}
            <Button
              onClick={handleSignUpClick}
              className="text-green-600 hover:text-green-700 font-medium p-0"
            >
              Sign Up
            </Button>
          </Typography>
        </div>
      </Paper>
    </Container>
  );
};

export default Login;
