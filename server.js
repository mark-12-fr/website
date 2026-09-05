const express = require('express');
const app = express();
const supabase = require('./db_connection');
const bcrypt = require('bcrypt');

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

app.get('/login', (req, res) => {
    res.render('login', {title: "Log In"});
});

app.post('/signupprocess', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Hash the password before storing
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const { data, error } = await supabase
        .from('users')
        .insert([{ username, password: hashedPassword }]);

    if (error) {
        res.send('<script>alert("Error!"); window.location.href = "/";</script>');
    } else {
        res.send('<script>alert("User registered successfully!"); window.location.href = "/";</script>');
    }
});

app.post('/loginprocess', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .single();

    if (error || !data) {
        res.send('<script>alert("User not found!"); window.location.href = "/login";</script>');
    } else {
        const match = await bcrypt.compare(password, data.password);
        if (match) {
            res.send('<script>alert("Login successful!"); window.location.href = "/";</script>');
        } else {
            res.send('<script>alert("Wrong password!"); window.location.href = "/login";</script>');
        }
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
