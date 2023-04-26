const express = require('express');
const dotenv = require('dotenv').config();
var cookieParser = require('cookie-parser')

const app = express();
const port = process.env.PORT || 5000;

const flights = require('./routs/flights.js');

app.use(cookieParser())

app.get('/', (req,res)=>{

    console.log('Cookies: ', req.cookies.token)
   
    return res.status(200).json({
        "done":true
    })
});

app.use('/flights', flights);

app.get('/login', (req,res)=>{

    res.cookie("token", "123", {

        httpOnly:true,
        maxAge:100000
    });

    return res.json({
        "islogged": true
    })
});

app.get('/logout', (req,res)=>{

   res.clearCookie("token");
   res.json({
    "islogged": false
   })
});



app.listen(port, ()=>{

    console.log(`server running on port ${port}`);
});