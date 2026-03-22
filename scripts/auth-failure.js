// scripts/auth-failure.js

import dotenv from 'dotenv';
dotenv.config();

const { OIDC_CLIENT_ID, OIDC_CLIENT_SECRET, OIDC_ISSUER_URL, REDIRECT_URI } = process.env;

function simulateAuthFailure() {
  console.log("Simulating authentication failure...");

  // Example of missing or incorrect credentials
  const missingVars = [];
  if (!OIDC_CLIENT_ID) missingVars.push("OIDC_CLIENT_ID");
  if (!OIDC_CLIENT_SECRET) missingVars.push("OIDC_CLIENT_SECRET");
  if (!OIDC_ISSUER_URL) missingVars.push("OIDC_ISSUER_URL");
  if (!REDIRECT_URI) missingVars.push("REDIRECT_URI");

  if (missingVars.length > 0) {
    console.error(`Authentication failed! Missing environment variables: ${missingVars.join(", ")}`);
    process.exit(1);
  }

  // Simulate failure even if all variables exist
  console.error("Authentication failed! Invalid credentials or provider unreachable.");
  process.exit(1);
}

simulateAuthFailure();