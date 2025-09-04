"use client";
import { useState } from "react";
import { TextField, Button, Card } from "@mui/material";
import { Typography } from "@mui/joy";

export default function LoginForm() {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleNext = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setStep(2); // move to password step
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with:", { username, password });
    // 👉 add your login API call here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 px-4">
      <Card className="w-full max-w-md p-8 shadow-2xl rounded-2xl border border-gray-100 bg-white/90 backdrop-blur">
        <Typography
          level="h2"
          align="center"
          className="font-bold text-gray-900 text-2xl mb-8"
        >
          Welcome Back 👋
        </Typography>

        {/* Form with sliding effect */}
        <form
          onSubmit={step === 1 ? handleNext : handleLogin}
          className="relative overflow-hidden h-48"
        >
          {/* Step 1: Username */}
          <div
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
              step === 1 ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mb-6"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg"
            >
              Next
            </Button>
          </div>

          {/* Step 2: Password */}
          <div
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
              step === 2 ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <TextField
              fullWidth
              type="password"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-6"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg"
            >
              Login
            </Button>

            <Button
              fullWidth
              onClick={() => setStep(1)}
              className="mt-3 text-indigo-600 normal-case"
            >
              ← Back
            </Button>
          </div>
        </form>

        {/* Extra: subtle footer */}
        <Typography
          level="body2"
          align="center"
          className="text-sm text-gray-500 mt-6"
        >
          Need help?{" "}
          <span className="text-indigo-600 cursor-pointer">
            Contact Support
          </span>
        </Typography>
      </Card>
    </div>
  );
}
