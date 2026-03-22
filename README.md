# The "Secure Entry" Gateway PoC

# Description
The goal of this project is to ensure no traffic reaches the backend compute layer unless it has been pre-verified by this central gateway. To save on compute costs and latency, the backend service relies entirely on the Gateway for authentication and must not perform its own JWT validation.

# Diagram of traffic flow for visualising

+-----------+           +---------------+            +---------------+
| Client    | --------> |GateWay/Proxy  | ---------> | Backend API   |
|           | <-------  |               | <--------  |               |
+-----------+           +---------------+            +---------------+

# Identifying the above components

1. Client – The user or application sends request via a JWT token to the Gateway/Proxy server.
            The client is configured as a web application in the OIDC complaint provide Auth0. A "client_ID" and "client_secret" has been automatically generated.
            A test user has been created in Autho and updated to allow  the test user to access this application.
2. Gateway/Proxy – Handles routing, authentication, authorisation.
3. Backend API – Actual services that process the request and return data.

#JWT generation steps:
1. To get an authosation code:
   

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


# Commands to test the success and failure scenarios
   -> At the project root folder, run the below command:
       
       -> For SUCCESS scenario:
              npm run test:auth-success

       ->  For FAILURE scenario:
              npm run test:auth-failure



   



    




      

 
