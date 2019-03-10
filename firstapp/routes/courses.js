const express =require('express');

const router= express.Router()

const courses = [
{
	id:1,name:'course1'
},
{
	id:2,name:'course3'
},
{
	id:3,name:'course3'
}
]

router.get('/', (req,res) => {
	res.send(courses);

});

// post
router.post('/', (req,res) => {
	// validation
	const { error }= validateCourse(req.body)


	if(error){
			res.status(400).send(error.details[0].message)
	}
	const course={
		id:courses.length+1,
		name:req.body.name
	};

	courses.push(course);
	res.send(course);
});
// routes params
router.get('/:id', (req,res) => {
	const course = courses.find(c =>
	{
		return c.id === parseInt(req.params.id)

	});

	if(!course) res.status(404).send('404');
		res.send(course)

});

router.put('/:id', (req,res) => {
// look up the course;
// 404 if not found
// 400 invalid

// find course
	const course = courses.find(c => {
			return c.id === parseInt(req.params.id)

	});

	if(!course) return res.status(404).send('404');

	// // validate course
	const { error }= validateCourse(req.body)


	if(error) return res.status(400).send(error.details[0].message)

	// update course
	course.name=req.body.name;
	res.send(course);


});

// delete
router.delete('/:id', (req,res) => {
	const course = courses.find(c => {
			return c.id === parseInt(req.params.id)

	});

	if(!course) return res.status(404).send('404');

	const index =courses.indexOf(course);
	courses.splice(index,1);
	res.send(course)

})

const validateCourse =(course)=>{
	const schema ={
		name:Joi.string().min(3).required()
	};
	return Joi.validate(course, schema);
}



router.get('/api/courses/:year/:month', (req,res) => {
res.send(req.params)

});

module.exports = router
