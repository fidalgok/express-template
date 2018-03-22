require('dotenv').config();
const express    = require('express'),
      app        = express(),
      bodyParser = require('body-parser'),
      path       = require('path'),
      engines    = require('consolidate'),
      indexRoutes = require('./routes/index');

//configure views and view engine
app.engine('html', engines.ejs);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

//configure app
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


//configure routes
app.use('/', indexRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = err;

    // render the error page
    res.status(err.status || 500);
    res.render('error', {status: err.status || 500});
});
//start server
app.listen(process.env.PORT, ()=> {
    console.log(`server started on ${process.env.PORT}`)
});
