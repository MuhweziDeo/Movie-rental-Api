const express= require('express');
const Joi=require('joi')
const app = express();
const logger = require('./logger');
const helmet=require('helmet');
const morgan = require('morgan');
const courses = require('./routes/courses');
const home=require('./routes/home');
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
app.use('/api/courses', courses)
app.use('/', home)

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


// port
const port = process.env.PORT || 3000;
console.log(port)

app.listen(port, () => {
	console.log(`Listenig ${port}`)
})
