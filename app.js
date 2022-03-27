var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//routes
var cartRouter = require('./routes/cartRoutes');
var userRouter = require('./routes/userRoutes');
var ordersRouter = require('./routes/ordersRoutes');
var productRouter = require('./routes/productRoutes');
var indexRouter = require('./routes/index');

var app = express();
app.use(express.json());


//add mongoose
const mongoose=require('mongoose');
//Go to this link https://cloud.mongodb.com/v2/61fcffb54ea38e1657f91ef7#security/network/accessList and add your current IP address

//Connect to mongodb
const dbURI="mongodb+srv://rohithshetty267:g816790264G@cluster0.9175m.mongodb.net/hackrocket?retryWrites=true&w=majority";
mongoose.connect(dbURI)
.then( (result)=>{
    console.log('connected to db');
    //listen for requests
    app.listen(3001);
})
.catch( (err)=>console.log(err));
// {useNewUrlParser:true,useUnifiedTopology:true};

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//using routes with middleware
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/cart',cartRouter);
app.use('/orders',ordersRouter);
app.use('/product',productRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;


