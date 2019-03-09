const express= require('express');
const Joi=require('joi')
const app = express();
const logger = require('./logger');
const helmet=require('helmet');
const morgan = require('morgan');

// config
const config = require('config');
// debug
// export DEBUG=app:startup
// export DEBUG=app:db
// export DEBUG=app
const startupDebugger=require('debug')('app:startup');
const dbDebugger =require('debug')('app:db');


// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(helmet());
app.use(logger);

// check production enviroment
// if(app.get('env') ==='development'){
// 	// log http req
// 	app.use(morgan('tiny'));
// 	console.log('morgan enabled')
// };


switch(app.get('env')){
	case('development'):
startupDebugger('morgan launched');
dbDebugger('connected to db');
	return(
		app.use(morgan('tiny'))
		
		)	
	};
// 
const courses=[
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

// routes
app.get('/', (req,res) => {
	res.send('hello world');

});

app.get('/api/courses', (req,res) => {
	res.send([1,2,4]);

});

// post
app.post('/api/courses', (req,res) => {
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
app.get('/api/courses/:id', (req,res) => {
	const course = courses.find(c =>
	{
		return c.id === parseInt(req.params.id)

	});

	if(!course) res.status(404).send('404');
		res.send(course)

});

app.put('/api/courses/:id', (req,res) => {
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
app.delete('/api/courses/:id', (req,res) => {
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



app.get('/api/courses/:year/:month', (req,res) => {
res.send(req.params)

})


// port
const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Listenig ${port}`)
})
