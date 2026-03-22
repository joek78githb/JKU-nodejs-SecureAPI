import express from "express";
import jsonLogger from "./jsonLogger.js";
import { createProxyMiddleware } from "http-proxy-middleware";
import { createRemoteJWKSet, jwtVerify } from "jose";


const app = express();

// ===== CONFIG =====
const ISSUER = "https://dev-iwhi7ksli2ohqaxj.us.auth0.com/";

//const AUDIENCE = "https://jku-secureapi";
//const AUDIENCE = "6uwHn3gllcZvjH5hCXimkviX5q3Ss3n0"
const AUDIENCE = "https://jku-secureapi"
const JWKS_URI = `${ISSUER}.well-known/jwks.json`;
const PORT = 4000;
const API_TARGET_URL = 'http://localhost:6000'; // The URL of your actual user API backend


// ===== JWKS CACHING =====
// jose automatically caches keys internally
const JWKS = createRemoteJWKSet(new URL(JWKS_URI));

// To check the status of server via browser or curl command
app.get('/status', (req, res) => {
    res.send('Gateway/Proxy service is running');
});

// ===== AUTH MIDDLEWARE =====
async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Missing token" });
    }

    const token = authHeader.split(" ")[1];

    // Verify JWT
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: ISSUER,
      audience: AUDIENCE,
    });

    // Extract user identity
    const userId = payload.sub || payload.email;

    // Attach only the user ID to req.user
    req.user = payload.sub; 


    if (!userId) {
      return res.status(401).json({ error: "Invalid token payload" });
    }

    // Inject header
    req.headers["x-verified-user"] = userId;

    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    return res.status(401).json({ error: "Unauthorized" });
  }
}

// sets req.user
app.use(authMiddleware);

// logs request/response in JSON format 
app.use(jsonLogger);

// Use the proxy middleware for the specific path
// All requests to http://localhost:4000/api/users/* will be forwarded
app.use('/api', authMiddleware, createProxyMiddleware({
    target: 'http://localhost:6000',
    changeOrigin: true, //required for virtualhost sites
}));


app.listen(PORT, () => {
    console.log(`Proxy server is running on http://localhost:${PORT}`);
    console.log(`Forwarding /api/users requests to ${API_TARGET_URL}`);
});
