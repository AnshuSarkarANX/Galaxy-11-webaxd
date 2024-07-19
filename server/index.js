const dotenv = require('dotenv').config()
const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');
const jwt = require('jsonwebtoken')
const flash = require('connect-flash')
const session = require('express-session')
const cookieparser = require('cookie-parser')
const adminauth = require('./middleware/AdminAuth')


const cors = require('cors');
const path = require('path')
const app = express();
const PORT = process.env.PORT;
const dbLink = process.env.MONGODB_URL;

const ApiRoute = require('./Route/apiRoute');
const AdminRoute = require('./Route/AdminRoute');



app.use(
  cors({
    origin: [
      "https://galaxy-11-webaxd.vercel.app",
      "https://galaxy-11-api.vercel.app"
    ],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());


app.use(flash());
app.use(cookieparser());
app.use(session({
    cookie: { maxAge: 5000 },
    secret: 'nodejs',
    resave: false,
    saveUninitialized: false
}))


app.use('/uploads', express.static('uploads'))
app.use(express.static(path.join(__dirname, 'public')));

app.use(adminauth.adminjwt)

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(ApiRoute);
app.use(AdminRoute);




mongoose.connect(dbLink, { useNewUrlParser: true, useUnifiedTopology: true, })
    .then(result => {
        app.listen(PORT, () => {
            console.log(`Server Running http://localhost:${PORT}`);
            console.log("Database Connected");
            // console.log(process.env.today);
        })
    })