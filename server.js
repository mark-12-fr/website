const express = require('express');
const app = express();
const db_connection = require('./db_connection');

app.set('view engine', 'ejs');
app.use(express.static('public'));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', {title: "Sign Up"});
});

app.get('/signup', (req, res) => {
    res.render('index', {title: "Sign Up"});
});

app.post('/signupprocess', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    

   const sql = `INSERT INTO users (username, password) VALUES (?, ?)`;


    db_connection.query(sql,[username, password], (err, result) => {
        if (err) throw err;
        res.send(
            '<script>alert("User registered successfully!"); window.location.href = "/";</script>');
        });
    });

    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });