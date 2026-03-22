// api-server.js
import express from "express";

const app = express();
const PORT = 6000;


function verifyUserHeader(req, res, next) {
  const user = req.headers["x-verified-user"];

  if (!user) {
    return res.status(403).json({
      error: "Forbidden: Missing x-verified-user header"
    });
  }

  // optionally attach to request for later use
  req.user = user;

  next(); // allow request to continue
}

// Middleware to parse JSON
app.use(express.json());

// Dummy data
let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
];

// To check the status of server via browser or curl command
app.get('/status', (req, res) => {
    res.send('Backend service is running');
});

app.use(verifyUserHeader); // applies to every API below

//To verify the user_id in the x-verified-user header
app.get("/data", (req, res) => {
  res.json({ message: `Hello ${req.user}` });
});

// GET all users
app.get('/users', (req, res) => {
    res.json(users);
});

// GET a user by ID
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');
    res.json(user);
});

// POST a new user
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    const newUser = { id: users.length + 1, name, email };
    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT update a user's information
app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');

    const { name, email } = req.body;
    user.name = name;
    user.email = email;
    res.json(user);
});

// DELETE a user
app.delete('/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) return res.status(404).send('User not found');

    const deletedUser = users.splice(userIndex, 1);
    res.json(deletedUser);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});