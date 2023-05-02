const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const cookieParser = require('cookie-parser')
const authController = require('./controllers/authController.js');
const hotelController = require('./controllers/hotelController.js');
    mongoose.set('strictQuery',true);

const app = express();
//const port = process.env.PORT || 5000;

app.use(cookieParser())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connect = async() =>{
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("connected to mongo server")
    }catch(error){
        throw error;
    }
};

mongoose.connection.on("disconnected", ()=>{
    console.log("mongoDB disconnected");
})

mongoose.connection.on("connected", ()=>{
    console.log("mongoDB connected");
})

///////////////////////////////////////////

app.get('/', (req, res) => {

    console.log('Cookies: ', req.cookies.token)

    return res.status(200).json({
        "done": true
    })
});


app.use('/hotels', require('./controllers/hotelController.js'));

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



/*
app.listen(port, () => {

    console.log(`server running on port ${port}`);
});*/
app.listen(5500,()=>{
    connect();
console.log("connected to backend")
})
