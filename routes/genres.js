const express = require('express');
const Joi = require('joi');
router = express.Router();
const mongoose= require('mongoose');

// schema
const genreSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
  }
})

// tabele
const Genre= mongoose.model('Genre',genreSchema);

// get all
router.get('/', async (req, res) => {
  const genres= await Genre.find().sort('name')
  console.log(genres)
  res.send(genres);
});


// post
router.post('/', async(req, res) => {
    const { error } = validateGenre(req.body);

    console.log(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    const genre= new Genre({
      name:req.body.name
    })

    try {
      const result = await genre.save()
      res.send(result);

    } catch (error) {
      res.send(error)
    }
 
});


// update
router.put('/:id', async(req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
   const genre = await Genre.findByIdAndUpdate(req.params.id,{name:req.body.name})
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    res.send(genre);
});

// delete
router.delete('/:id', async(req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const genre = await Genre.findByIdAndRemove(req.params.id,{name:req.body.name})
   
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    res.send(genre);

});

// get one
router.get('/:id', async(req, res) => {
  const genre = await Genre.findById(req.params.id)
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
});

// helpers
function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(genre, schema);
}

module.exports= router,
module.exports.genreSchema = genreSchema
module.exports.Genre=Genre
