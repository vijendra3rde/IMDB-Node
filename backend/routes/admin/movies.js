var express = require('express')
var app = express()
var mongodb = require('mongodb');
const Movies = require('../../db/models/movies.model')
const Actors = require('../../db/models/actors.model')
const Producers = require('../../db/models/producers.model')
const multer = require('multer');
//const upload = multer({dest: 'uploads/'});
const router = express.Router();
const bodyParser = require('body-parser')
const path = require('path');
 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
 

const imageStorage = multer.diskStorage({
    // Destination to store image     
    destination: 'publics/uploads', 
      filename: (req, file, cb) => {
          cb(null, file.fieldname + '_' + Date.now() 
             + path.extname(file.originalname))
            // file.fieldname is name of the field (image)
            // path.extname get the uploaded file extension
    }
});

const imageUpload = multer({
    storage: imageStorage,
    limits: {
      fileSize: 1000000 // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg)$/)) { 
         // upload only png and jpg format
         return cb(new Error('Please upload a Image'))
       }
     cb(undefined, true)
  }
}) 

//upload single image
router.post('/upload', imageUpload.single('image'), (req, res) => {
    res.send(req.file)
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
}) 
  

//get all movies
router.get('/all', function(req, res) {
    Movies.find({}, { name: 1, year_of_release:1,plot:1, poster:1, actor_id:1, producer_id:1})
    .then((result)=>{
        if(result.length == 0)
        {
            res.json(404, ['code:404', 'message:movies doesnt exist'])
        }else{
            res.json(200, result)
        }  
    }) 
 })

//create producers API
router.post('/create', imageUpload.single('poster'), function(req, res) {
    
	req.assert('name', 'Name is required').notEmpty()           //Validate name
	req.assert('year_of_release', 'Year of release is required').notEmpty()             //Validate age
	req.assert('plot', 'plot is required').notEmpty()
    req.assert('producer_id', 'Producer id is required').notEmpty()
    req.assert('actor_id', 'Actor id is required').notEmpty()
                 //Validate age
  
    var errors = req.validationErrors()
    
    if( !errors ) 
    {     
		var moviesObj = {
            actor_id: req.body.actor_id,
            producer_id: req.body.producer_id,
			name: req.sanitize('name').escape().trim(),
			year_of_release: req.sanitize('year_of_release').escape().trim(),
            plot: req.sanitize('plot').escape().trim(), 
            poster: req.file.filename
        }
		
        try{
            const movies = new Movies(moviesObj)
                 movies.save() 
                console.log(movies)
                res.json(200,{'movies': movies, 'file': req.file})
        } catch (error) {
            console.log(error)
            res.json(404, {'error':error})
        }  
	}
	else {   
        //Display errors to user
		var error_msg = ''
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>'
		})	
        res.json(404, {'error':error_msg})	 		 
    }
 })

 router.get('/', function(req, res) {
    sess = req.session;
    var userMap = {};

    Movies.find({}, function(err, movies) { 
        res.render('admin/movies/view', {title: 'Dashboard', data: movies})
    }); 
 })
 

// SHOW ADD movies FORM
router.get('/add', function(req, res, next){
    var actorsAA = {};
    var producers = {};

    Actors.find({},{name:1})
    .then((result)=>{
        if(result.length == 0)
        {
            actorsAA = false;
        }else{
            actorsAA = result
            console.log(result);
        }    
  }) 
 
 	res.render('admin/movies/add', {
		title: 'Add New movies',
		name: '',
		year_of_release: '',
		plot: '',
		poster: '',
        actors:'',
        producers:'',
        producer_id:'',
        actor_id:''			
	})
	 
}) 

// ADD NEW movies POST ACTION
router.post('/add', imageUpload.single('poster'), function(req, res, next){ 
	
	req.assert('name', 'Name is required').notEmpty()           //Validate name
	req.assert('year_of_release', 'Year of release is required').notEmpty()             //Validate age
	req.assert('plot', 'plot is required').notEmpty()             //Validate age
  
    var errors = req.validationErrors()
    console.log(req.file)
    
    if( !errors ) 
    {    
        
		var moviesObj = {
			name: req.sanitize('name').escape().trim(),
			year_of_release: req.sanitize('year_of_release').escape().trim(),
            plot: req.sanitize('plot').escape().trim(), 
            poster: req.file.filename,
            actor_id: req.body.actor_id,
            producer_id: req.body.producer_id
        }
		
        try{
            const movies = new Movies(moviesObj)
            movies.save() 
            req.flash('success', 'Data added Successfully!')
 			res.redirect('/admin/movies/');
        } catch (error) {
            req.flash('error', error)
            console.log(error)
        }  
	}
	else {   //Display errors to user
		var error_msg = ''
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>'
		})				
		req.flash('error', error_msg)		
		
		/**
		 * Using req.body.name 
		 * because req.param('name') is deprecated
		 */ 
         res.render('admin/movies/add', {
            title: 'Add New movies',
            name: '',
            year_of_release: '',
            plot: '',
            poster: '',
            producer_id:'',
            actor_id:''			
        })
    }
})

// SHOW EDIT USER FORM
router.get('/edit/(:id)', function(req, res, next){
    Movies.findById(req.params.id)
    .then(movie => {
        console.log(movie);
        res.render('admin/movies/edit', {
            id : req.params.id,
            name: movie.name,
            title: 'edit movies',
            year_of_release: movie.year_of_release,
            plot: movie.plot,
            producer_id:'',
            actor_id:'',
            actors:'',
            producers:'',
            poster: movie.poster		
        })
    })
    .catch(err => {
        console.log(err);
        req.flash('error', err)
        res.redirect('/admin/movies/');
    });
})

// EDIT movies POST ACTION
router.put('/edit/(:id)', function(req, res, next) {
    console.log(req.body)
    req.assert('name', 'Name is required').notEmpty()          
	req.assert('year_of_release', 'Year of release is required').notEmpty()   
	req.assert('plot', 'plot is required').notEmpty()      
  
    var errors = req.validationErrors()
    if( !errors ) 
    {     
		var moviesObj = {
			name: req.sanitize('name').escape().trim(),
			year_of_release: req.sanitize('year_of_release').escape().trim(),
            plot: req.sanitize('plot').escape().trim(), 
            actor_id: req.body.actor_id,
            producer_id: req.body.producer_id, 
        }
		
        try{
            Movies.update({_id: req.params.id}, moviesObj,
                function(err, docs){ 
                    if(err) res.json(err);
                    else  res.redirect('/admin/movies/edit/'+req.params.id);
                }
            ); 
        } catch (error) {
            req.flash('error', error)
            console.log(error)
            res.redirect('/admin/movies/edit/'+req.params.id);
        } 
		
		 
	}
	else {   //Display errors to user
		var error_msg = ''
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>'
		})
		req.flash('error', error_msg)

		res.render('admin/movies/edit', {
            title: 'edit movies',
            id: req.params.id,
            name: req.body.name,
            year_of_release: req.body.year_of_release,
            plot: req.body.plot,
            poster: req.body.poster,
            producer_id:req.body.producer_id,
            actor_id:req.body.actor_id,
            actors:'',
        producers:''				

        })
    }
})



// DELETE  question
router.delete('/delete/(:id)', function(req, res, next) {
    try{ 
        Movies.findByIdAndRemove(req.params.id, (err, doc) => {
            if (!err) {
                 req.flash('success', 'Successfully deleted one producer')
                res.redirect('/admin/movies/');
            } else {
                console.log('Failed to Delete producer Details: ' + err);
                req.flash('error', err)
                 res.redirect('/admin/movies/');
            }
        }); 
    } catch (error) {
        req.flash('error', error)
        console.log(error)
        res.redirect('/admin/movies/');
    }
}) 

module.exports = router; 