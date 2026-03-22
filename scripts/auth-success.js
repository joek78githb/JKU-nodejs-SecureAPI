// scripts/auth-success.js

import dotenv from 'dotenv';
dotenv.config();

const { OIDC_CLIENT_ID, OIDC_CLIENT_SECRET, OIDC_ISSUER_URL, REDIRECT_URI } = process.env;

function simulateAuthSuccess() {
  if (!OIDC_CLIENT_ID || !OIDC_CLIENT_SECRET || !OIDC_ISSUER_URL || !REDIRECT_URI) {
    console.error("Missing OIDC environment variables. Check your .env file.");
    process.exit(1);
  }

  console.log("OIDC environment variables loaded successfully!");
  console.log("Simulating authentication...");

  // Simulated user info after a successful login
  const user = {
    id: "testuser2026",
    name: "Jku Test",
    email: "jku@example.com"
  };

  console.log("🎉 Authentication success!");
  console.log("User details:", user);
}

simulateAuthSuccess();