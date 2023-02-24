require('dotenv').config();
const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');  
var multer = require('multer');
var upload = multer();
const mongoose = require('mongoose');

const districtRouter = require('./routers/district');
const provinceRouter = require('./routers/province');
const authRouter = require('./routers/auth');
const productRouter = require('./routers/product');
const branchRouter = require('./routers/branch');
const saleRouter = require('./routers/sale');

mongoose.set('strictQuery', true);
mongoose.connect(
    process.env.DB_URI,  
    null,
    (err) => {
        if (err) {
            console.log(err);
        }
        else console.log("Mongodb is connected");
    }
);

const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
    methods: ["GET", "PUT", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Set-Cookie"],
};

app.use(cors(corsOptions));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

app.get('/test', (req, res) => {
    res.status(200).send('OK');
});

app.use('/province', provinceRouter);
app.use('/district', districtRouter);
app.use('/auth', authRouter);
app.use('/product', productRouter);
app.use('/branch', branchRouter);
app.use('/sale', saleRouter);

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});