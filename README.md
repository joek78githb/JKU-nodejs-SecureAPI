# The "Secure Entry" Gateway PoC

Overview

This project demonstrates a gateway-enforced authentication architecture for securing access to backend services in a distributed system.

All external requests are authenticated at a central gateway layer using OIDC (Auth0) and JWT validation, ensuring that only verified and authorized traffic reaches backend services.

The backend is intentionally decoupled from external authentication logic and operates within a trusted internal execution boundary.

# Architecture

Client (Web / API Consumer)
        |
        |  OAuth2 / OIDC (Auth0) → JWT
        v
+----------------------+
|   Gateway / Proxy    |
|----------------------|
| - JWT validation     |
| - Signature verify   |
| - Authorization      |
| - Claim extraction   |
+----------------------+
        |
        | Trusted internal request
        | (identity headers)
        v
+----------------------+
|    Backend API       |
|----------------------|
| - Business logic     |
| - No external auth   |
+----------------------+

# Security Model
Trust Boundary

This system enforces a clear separation between external and internal trust domains:

The Gateway is the only externally exposed component
It is responsible for validating all incoming authentication tokens
Backend services operate within a trusted internal network boundary

# Identity Propagation

After successful authentication, the Gateway forwards requests to backend services with trusted identity assertions via header such as:

x-verified-user


The header is 

Generated only by the Gateway
Not accepted from external clients
Treated as trusted input within the internal network

# Authentication Flow
Client authenticates via Auth0 (OIDC)
Client receives a signed JWT access token
Client sends request with JWT to Gateway
Gateway:
Validates JWT signature
Verifies token claims and expiration
Extracts identity information
Gateway forwards request to Backend with identity header
Backend processes request based on trusted identity context

# Threat Model
1. Token Tampering / Replay Attacks
Risk: Invalid or modified JWTs used to access system
Mitigation: Gateway performs cryptographic JWT verification using Auth0 public keys

2. Header Spoofing
Risk: External actor injects fake identity headers
Mitigation:
Backend only trusts headers originating from Gateway
Internal network isolation prevents direct backend access

3. Direct Backend Access
Risk: Bypass of Gateway authentication layer
Mitigation:
Backend services are not exposed externally
Only Gateway has routing access

4. Privilege Escalation via Claims Manipulation
Risk: User modifies token claims (roles, permissions)
Mitigation:
Gateway enforces authorization before forwarding requests
Backend treats identity headers as non-authoritative input

# Design Rationale

This architecture separates concerns between authentication and business logic:

Authentication is centralized at the Gateway to ensure consistency and reduce duplication
Backend services remain stateless with respect to authentication
Identity is propagated via trusted internal headers after validation

This model is optimized for:

Simplified backend services
Centralized security enforcement
Reduced authentication overhead across services



# To Run the project locally

1. Install dependencies:-
   -> Install Node.js (if Node.js does not exist on your computer)

2. At the root of the project folder, perform the following:-
   -> Then Run :
       npm install

   -> After the above installation, verify both are available:
       node -v
       npm -v

   -> Install Express
       npm install express

3. Start services in separate terminals
       - To start the gateway/proxy service, issue the below command:
            npm start  
              or
            node proxy-service.js

        - To start the backend service, issue the below command:
            node api-service.js

4.  Open your browser or Postman:
        via browser:
         http://localhost:4000/status

        via Postman
        GET method - http://localhost:4000/status

        Response: Gateway/Proxy service is running  

        via browser:
         http://localhost:6000/status

        via Postman:
        GET method - http://localhost:6000/status

        Response: Backend service is running  


# To setu OIDC Credentials
   -> The .env file attached to the root of the project folder has the configs required to setup a oauth client/app.

# Test Scenarios
Successful Authentication Flow:
Valid JWT issued by Auth0.
Gateway validates token successfully.
Request forwarded to backend with identity context.

Failed Authentication Flow:
Missing or invalid JWT.
Gateway rejects request with 401 Unauthorized.


# Commands to test the success and failure scenarios
   -> At the project root folder, run the below command:
       
       -> For SUCCESS scenario:
              npm run test:auth-success

       ->  For FAILURE scenario:
              npm run test:auth-failure



   



    




      

 
