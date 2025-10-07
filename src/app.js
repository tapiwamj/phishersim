const express = require('express');
const app = express();
const nunjucks = require("nunjucks");
const port = 3000;
const path = require("path");
const storyManager = require('./storyManager.js');
storyManager.fetchStoryMap();
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute window
    max: 2, // limit each IP to 5 requests per windowMs
    message: { error: "Too many requests, please try again later." }
});
// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.set("view engine", "njk");
nunjucks.configure(path.join(__dirname, "views"), {
  autoescape: true,
  express: app,
  watch: true,
});
// Routes
app.get('/', (req, res) => {
    res.render("emails");
});
app.get('/test', limiter, (req, res) => {
    setTimeout(() => {
        return res.json({test: "ok"});
    }, 300);
});
app.post('/login', limiter, (req, res) => {
    const { username, password } = req.body;
    return res.json({ username, password });
});
app.get('/data', limiter, (req, res) => {
    const users = [];
    for (let i = 1; i <= 20; i++) {
        users.push({
            id: i,
            username: `user${i}`,
            email: `user${i}@example.com`,
            created_at: new Date(Date.now() - i * 86400000).toISOString()
        });
    }
    return res.json({ users });
});
app.get('/insert', (req, res) => {
    res.render("emails");
});
app.get('/fetchEmail/:index', async(req, res) => {
    const index = parseInt(req.params.index, 10);
    const email = await storyManager.getEmail(index); 
    return res.json(email);
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});



