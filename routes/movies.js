const express = require('express');
const mongoose=require('mongoose');
const router = express.Router()
const Joi=require('joi');
const { genreSchema } = require('./genres');
const {Genre}= require('./genres');

// schema

// table

const Movie=mongoose.model('Movie', new mongoose.Schema({
	title:{
		require:true,
		type:String
	},
	numberInStock:{
		type:Number,
		required:true,
		min:0,
		max:255
	},
	dailyRentalRate:{
		type:Number,
		required:true,
		min:0,
		max:255
	},
	created:{
		type:Date,
		default:Date.now
	},
	genre:{
		type:genreSchema,
		required:true
	},
	
}));

// helper
function movieValidator(movie){
	const schema = {
		title:Joi.string().min(5).required(),
		numberInStock:Joi.number().required(),
		dailyRentalRate:Joi.number().required(),
			genreId:Joi.string()
		}
	return Joi.validate(movie,schema);	
};
function movieUpdateValidator(movie){
	const schema = {
		title:Joi.string().min(5),
		numberInStock:Joi.number(),
		dailyRentalRate:Joi.number(),
		genreId:Joi.string()
	
		}
	return Joi.validate(movie,schema);	
};


// get all
router.get('/', async(req,res)=>{
	const movies = await Movie.find()
	res.send(movies);
})

// post 
router.post('/', async(req,res)=>{
	const {error}=movieValidator(req.body) 
	if(error) return res.status(400).send(error.details[0].message);

	const genre=await Genre.findById(req.body.genreId)
	if(!genre) return res.status(400).send('Invalid Genre')

	const movie = new Movie({
		title:req.body.title,
		numberInStock:req.body.numberInStock,
		dailyRentalRate:req.body.dailyRentalRate,
		genre:{
			_id:genre._id,
			name:genre.name
		}
	})

	const result = await movie.save()
	res.send(result);
})

// get one
router.get('/:id', async(req,res)=>{
	try{
		const movie = await Movie.findById(req.params.id)
 		return res.send(movie);
	}
	catch(err){
		res.status(404).send('404')
	}
})

// put()
router.put('/:id', async(req,res) => {
	const {error}= movieUpdateValidator(req.body)
	if(error) return res.status(400).send(error.details[0].message)

	const movie = await Movie.findOneAndUpdate(req.params.id, req.body)
	if (!movie) return res.status(404).send('The movie with the given ID was not found.');
	// const result = await movie.save()
    console.log(movie)
    res.send(movie);
  

})

router.delete('/:id', async(req,res) => {

	const movie = await Movie.findOneAndDelete(req.params.id, req.body)
	if (!movie) return res.status(404).send('The movie with the given ID was not found.');
    console.log(movie)
    res.send(movie);
  

})




module.exports=router;


 
