const express = require('express');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser')
const authController = require('./controllers/authController.js');

const app = express();
const port = process.env.PORT || 5000;

app.use(cookieParser())
app.use(express.json());

app.get('/', (req, res) => {

    console.log('Cookies: ', req.cookies.token)

    return res.status(200).json({
        "done": true
    })
});



app.get('/login', (req, res) => {

    res.cookie("token", "123", {

        httpOnly: true,
        maxAge: 100000
    });

    return res.json({
        "islogged": true
    })
});

app.get('/logout', (req, res) => {

    res.clearCookie("token");
    res.json({
        "islogged": false
    })
});

app.post('/signup', (req, res) => {

    console.log(req.body.username)
    res.json({
        "islogged": false
    })
});


app.use('/auth', authController)



app.listen(port, () => {

    console.log(`server running on port ${port}`);
});