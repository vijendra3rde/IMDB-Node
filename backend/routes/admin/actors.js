var express = require('express')
var app = express()
var mongodb = require('mongodb');
const Actors = require('../../db/models/actors.model')

//get all actors
app.get('/all', function(req, res) {
    Actors.find({}, { name: 1, gender:1})
    .then((result)=>{
        if(result.length == 0)
        {
            res.json(404, ['code:404', 'message:actors doesnt exist'])
        }else{
            res.json(200, result)
        }  
    }) 
 })

//create actors API
app.post('/create', function(req, res) {

    req.assert('name', 'Name is required').notEmpty()           //Validate name
	req.assert('gender', 'Gender is required').notEmpty()             //Validate age
	req.assert('dob', 'Date of birth is required').notEmpty()             //Validate age
  
    var errors = req.validationErrors()
    
    if( !errors ) 
    {     
		var actorsObj = {
			name: req.sanitize('name').escape().trim(),
			gender: req.sanitize('gender').escape().trim(),
            dob: req.sanitize('dob').escape().trim(), 
            bio: req.sanitize('bio').escape().trim()
        }
		
        try{
            const actors = new Actors(actorsObj)
                actors.save() 
                console.log(actors)
                res.json(200, actors)
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

 //view all actors
app.get('/', function(req, res) {
    sess = req.session; 
    Actors.find({}, function(err, actors) { 
        res.render('admin/actors/view', {title: 'Dashboard', data: actors})
    }); 
 })

// show form add actors 
app.get('/add', function(req, res, next){	
	 
 	res.render('admin/actors/add', {
		title: 'Add New Actors',
		name: '',
		gender: '',
		dob: '',
		bio: ''			
	})
	 
}) 

// ADD NEW actors POST ACTION
app.post('/add', function(req, res, next){ 
	
	req.assert('name', 'Name is required').notEmpty()           //Validate name
	req.assert('gender', 'Gender is required').notEmpty()             //Validate age
	req.assert('dob', 'Date of birth is required').notEmpty()             //Validate age
  
    var errors = req.validationErrors()
    
    if( !errors ) 
    {     
		var actorsObj = {
			name: req.sanitize('name').escape().trim(),
			gender: req.sanitize('gender').escape().trim(),
            dob: req.sanitize('dob').escape().trim(), 
            bio: req.sanitize('bio').escape().trim()
        }
		
        try{
            const actors = new Actors(actorsObj)
            actors.save() 
            req.flash('success', 'Data added Successfully!')
 			res.redirect('/admin/actors/');
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
         res.render('admin/actors/add', {
            title: 'Add New Actors',
            name: '',
            gender: '',
            dob: '',
            bio: ''			
        })
    }
})

// SHOW EDIT USER FORM
app.get('/edit/(:id)', function(req, res, next){
    Actors.findById(req.params.id)
    .then(actor => {
        console.log(actor);
        res.render('admin/actors/edit', {
            title: 'edit Actors',
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
        res.redirect('/admin/actors/');
    });
 
})

// EDIT actors POST ACTION
app.put('/edit/(:id)', function(req, res, next) {

    req.assert('name', 'Name is required').notEmpty()           //Validate name
	req.assert('gender', 'Gender is required').notEmpty()             //Validate age
	req.assert('dob', 'Date of birth is required').notEmpty()             //Validate age
 
    var errors = req.validationErrors()
    
    if( !errors ) {   //No errors were found.  Passed Validation!

         var actorsObj = {
			name: req.sanitize('name').escape().trim(),
			gender: req.sanitize('gender').escape().trim(),
            dob: req.sanitize('dob').escape().trim(), 
            bio: req.sanitize('bio').escape().trim()
        } 

        try{
            Actors.update({_id: req.params.id}, actorsObj,
                function(err, docs){ 
                    if(err) res.json(err);
                    else  res.redirect('/admin/actors/edit/'+req.params.id);
                }
            );
            
            // const actors = new Actors(actorsObj)
            //     actors.update({'_id': req.params.id});
            //     req.flash('success', 'Data update Successfully!')
            //     res.redirect('/admin/actors/');
            } catch (error) {
                req.flash('error', error)
                console.log(error)
                res.redirect('/admin/actors/edit/'+req.params.id);
            }  
	}
	else {   //Display errors to user
		var error_msg = ''
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>'
		})
		req.flash('error', error_msg)

		res.render('admin/actors/edit', {
            title: 'edit Actors',
            name: '',
            gender: '',
            dob: '',
            bio: ''			
        })
    }
})

// DELETE  actors
app.delete('/delete/(:id)', function(req, res, next) {
    try{ 
        Actors.findByIdAndRemove(req.params.id, (err, doc) => {
            if (!err) {
                console.log("Successfully deleted one document.");
                req.flash('success', 'Successfully deleted one actor')
                res.redirect('/admin/actors/');
            } else {
                console.log('Failed to Delete actor Details: ' + err);
                req.flash('error', err)
                 res.redirect('/admin/actors/');
            }
        }); 
    } catch (error) {
        req.flash('error', error)
        console.log(error)
        res.redirect('/admin/actors/');
    }
})



module.exports = app;