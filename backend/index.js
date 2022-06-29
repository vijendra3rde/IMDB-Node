const express = require('express')
const app = express()
const connectDatabase = require("./db/config");

 connectDatabase()

 const port = process.env.PORT || 3001;


 app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:${port}');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

var cors = require('cors');

// use it before all route definitions
app.use(cors({
  origin: '*'
})); 

/**
 * setting up the templating view engine
 */ 
 app.set('view engine', 'ejs')

 /**
  * import routes/admin
  */  
 const admin = require('./routes/admin/index')
 app.use(express.static(__dirname + '/publics'));
 app.use(express.static('public/uploads'));

/**
 * Express Validator Middleware for Form Validation
 */ 
 const expressValidator = require('express-validator')
 
 
 /**
  * body-parser module is used to read HTTP POST data
  * it's an express middleware that reads form's input 
  * and store it as javascript object
  */ 
 const bodyParser = require('body-parser')
 app.use(expressValidator())

 /**
  * bodyParser.urlencoded() parses the text as URL encoded data 
  * (which is how browsers tend to send form data from regular forms set to POST) 
  * and exposes the resulting object (containing the keys and values) on req.body.
  */ 
 app.use(bodyParser.urlencoded({ extended: true }))
 app.use(bodyParser.json())

 
 /**
  * This module let us use HTTP verbs such as PUT or DELETE 
  * in places where they are not supported
  */ 
 const methodOverride = require('method-override')
 
 
 /**
  * using custom logic to override method
  * 
  * there are other ways of overriding as well
  * like using header & using query value
  */ 
 
 app.use(methodOverride(function (req, res) {
  
   if (req.body && typeof req.body === 'object' && '_method' in req.body) {
     // look in urlencoded POST bodies and delete it
     var method = req.body._method
     delete req.body._method
     return method
   }
 }))
 
 /**
  * This module shows flash messages
  * generally used to show success or error messages
  * 
  * Flash messages are stored in session
  * So, we also have to install and use 
  * cookie-parser & session modules
  */ 
 var flash = require('express-flash')
 var cookieParser = require('cookie-parser');
 var session = require('express-session');
  
 
 // app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
 
 
 app.use(cookieParser('keyboard cat'))
 app.use(session({ 
     secret: 'keyboard cat',
     resave: false,
     saveUninitialized: true,
     // cookie: { maxAge: 60000 }
 })) 
  
 app.use(flash())
 
    
app.use('/admin', admin) 


app.get('/', function (req, res) {
    res.send('Hello World')
  }) 
 
// open the server
app.listen(port, () => {
  console.log(`Express is running on port ${port}`);
}); 
 
