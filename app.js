const express = require('express');
const app = express();
const userRouter = require('./routes/user.routes');
const indexRouter = require('./routes/index.routes');
const dotenv = require('dotenv');
dotenv.config();
const connectTODB = require('./config/db');
connectTODB();
const cookieParser = require('cookie-parser');
app.use(cookieParser());


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/user',userRouter);
app.use('/',indexRouter);


app.listen(3000,()=>{
    console.log("server running on port 3000");  
})