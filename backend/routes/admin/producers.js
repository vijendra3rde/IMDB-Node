var express = require('express')
var app = express()
var mongodb = require('mongodb');
const Producers = require('../../db/models/producers.model')

//get producers api
app.get('/all', function(req, res) {
    Producers.find({}, { name: 1, gender:1})
    .then((result)=>{
        if(result.length == 0)
        {
            res.json(404, ['code:404', 'message:producers doesnt exist'])
        }else{
            res.json(200, result)
        }  
    }) 
})
//create producers API
app.post('/create', function(req, res) {

    req.assert('name', 'Name is required').notEmpty()           //Validate name
	req.assert('gender', 'Gender is required').notEmpty()             //Validate age
	req.assert('dob', 'Date of birth is required').notEmpty()             //Validate age
  
    var errors = req.validationErrors()
    
    if( !errors ) 
    {     
		var producersObj = {
			name: req.sanitize('name').escape().trim(),
			gender: req.sanitize('gender').escape().trim(),
            dob: req.sanitize('dob').escape().trim(), 
            bio: req.sanitize('bio').escape().trim()
        }
		
        try{
            const producers = new Producers(producersObj)
                producers.save() 
                console.log(producers)
                res.json(200, producers)
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

app.get('/', function(req, res) {
    sess = req.session;
    var userMap = {};

    Producers.find({}, function(err, producers) { 
        res.render('admin/producers/view', {title: 'Dashboard', data: producers})
    }); 
 })

// SHOW ADD producers FORM
app.get('/add', function(req, res, next){	
	 
 	res.render('admin/producers/add', {
		title: 'Add New producer',
		name: '',
		gender: '',
		dob: '',
		bio: ''			
	})
	 
}) 

// ADD NEW producers POST ACTION
app.post('/add', function(req, res, next){ 
	
	req.assert('name', 'Name is required').notEmpty()           //Validate name
	req.assert('gender', 'Gender is required').notEmpty()             //Validate age
	req.assert('dob', 'Date of birth is required').notEmpty()             //Validate age
  
    var errors = req.validationErrors()
    
    if( !errors ) 
    {     
		var producersObj = {
			name: req.sanitize('name').escape().trim(),
			gender: req.sanitize('gender').escape().trim(),
            dob: req.sanitize('dob').escape().trim(), 
            bio: req.sanitize('bio').escape().trim()
        }
		
        try{
            const producers = new Producers(producersObj)
            producers.save() 
            req.flash('success', 'Data added Successfully!')
 			res.redirect('/admin/producers/');
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
         res.render('admin/producers/add', {
            title: 'Add New producer',
            name: '',
            gender: '',
            dob: '',
            bio: ''			
        })
    }
})

// SHOW EDIT USER FORM
app.get('/edit/(:id)', function(req, res, next){
     
    Producers.findById(req.params.id)
    .then(actor => {
        console.log(actor);
        res.render('admin/producers/edit', {
            title: 'edit Producers',
            id : req.params.id,
            name: actor.name,
            gender: actor.gender,
            dob: actor.dob,
            bio: actor.bio			
        })
    })
    .catch(err => {
        console.log(err);
        req.flash('error', err)
        res.redirect('/admin/producers/');
    });
})
 

// EDIT actors POST ACTION
app.put('/edit/(:id)', function(req, res, next) {

    req.assert('name', 'Name is required').notEmpty()           //Validate name
	req.assert('gender', 'Gender is required').notEmpty()             //Validate age
	req.assert('dob', 'Date of birth is required').notEmpty()             //Validate age
 
    var errors = req.validationErrors()
    
    if( !errors ) {   //No errors were found.  Passed Validation!

         var producersObj = {
			name: req.sanitize('name').escape().trim(),
			gender: req.sanitize('gender').escape().trim(),
            dob: req.sanitize('dob').escape().trim(), 
            bio: req.sanitize('bio').escape().trim()
        } 

        try{
            Producers.update({_id: req.params.id}, producersObj,
                function(err, docs){ 
                    if(err) res.json(err);
                    else  res.redirect('/admin/producers/edit/'+req.params.id);
                }
            ); 

            } catch (error) {
                req.flash('error', error)
                console.log(error)
                res.redirect('/admin/producers/edit/'+req.params.id);
            }  
	}
	else {   //Display errors to user
		var error_msg = ''
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>'
		})
		req.flash('error', error_msg)

		res.render('admin/producers/edit', {
            title: 'edit Producers',
            name: '',
            gender: '',
            dob: '',
            bio: ''			
        })
    }
})

// DELETE  producers
app.delete('/delete/(:id)', function(req, res, next) {
    try{ 
        Producers.findByIdAndRemove(req.params.id, (err, doc) => {
            if (!err) {
                 req.flash('success', 'Successfully deleted one producer')
                res.redirect('/admin/producers/');
            } else {
                console.log('Failed to Delete producer Details: ' + err);
                req.flash('error', err)
                 res.redirect('/admin/producers/');
            }
        }); 
    } catch (error) {
        req.flash('error', error)
        console.log(error)
        res.redirect('/admin/producers/');
    }
}) 

module.exports = app;