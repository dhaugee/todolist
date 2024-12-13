const express = require('express')
const app = express()
const data = require("./data")

app.set("views", "html")
app.set("view engine", "pug")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('resources'))

const PORT = 4131;

app.get(['/', '/home'], (req, res) => {
    res.render('main');
});

// Handle all other routes
app.use((req, res) => {
    res.status(404).render('404');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});