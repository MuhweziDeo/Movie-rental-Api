const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground').
then(()=>{console.log('connected')})
.catch(err=>console.log(err)); 

// table
const courseSchema = new mongoose.Schema({
	name:String,
	author:String,
	tags:[String],
	date:{
		type:Date,
		default:Date.now
	},
	isPublished:Boolean
})

// create collection / table
const Course = mongoose.model('Course',courseSchema);

// insert data
async function createCourse(){
	const course = new Course({
	name:'deee2',
	author:'Strin2g',
	tags:['dde2','sss2'],
	isPublished:true
})

const result = await course.save()
console.log(result)
}

// insert data
// createCourse()

// query data
async function getCourses(){
	// get all
	const courses = await Course.find().limit(10).sort({name:1}).select({name:1, tags:1})
	console.log(courses);

	// filter
	const coursesFliter= await Course({author:'deee2'})
	console.log(coursesFliter)

}

getCourses()
