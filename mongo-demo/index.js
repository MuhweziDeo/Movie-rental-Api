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

	// eq (eqaul)
	// ne (not equal)
	// gt (greater than)
	// gte (greater than or equal to)
	// lt(less than)
	// in
	// nin


	// get all
	const courses = await Course
	// .find().limit(10).sort({name:1}).select({name:1, tags:1})
	// query using comparision operators
	// .find({ price : { $gt:10 , $gte:10 } } )
	find( { price: { $in: [2,5,6] } } )
	console.log(courses);

	// filter
	const coursesFliter= await Course({author:'deee2'})
	console.log(coursesFliter)

}

async function getCourses(){
	// logic operators
	// or
	// and

	// get all
	const courses = await Course
	.find()
	.or([{author:'Mosh'},{isPublished:true}])
	.and([])
	console.log(courses);

	// filter
	const coursesFliter= await Course({author:'deee2'})
	console.log(coursesFliter)

}

async function getCourses(){
	// filter using regular expression

	// get all
	const courses = await Course
	// starts with
	.find({author:/^deee/})
	// endwith
	.find({author:/deee$/i})

	// contains
.find({author:/.*deee.*/i})
	console.log(courses);

	// filter
	const coursesFliter= await Course({author:'deee2'})
	console.log(coursesFliter)

}


// async function getCourses(){
// 	//counting documents

// 	// get all
// 	const courses = await Course
// 	.find()
// 	.count()
// 	console.log(courses);

// 	// filter
// 	const coursesFliter= await Course({author:'deee2'})
// 	console.log(coursesFliter)

// }

async function getCourses(){
	
	//pagination
	const pageNumber=2;
	const pageSize=10;
	// get all
	const courses = await Course
	.find()
	.skip((pageNumber-1)*pageSize)
	.limit(10)
	console.log(courses);

	// filter
	const coursesFliter= await Course({author:'deee2'})
	console.log(coursesFliter)

}
// getCourses()


async function updateCourse(_id) {
	const courses = await Course.find()
	const course = await Course.findById(_id)

	if(!course) return;

	// method 1
	course.isPublished=true;
	course.author='Another user'

	const result = await course.save()
	// console.log(result)
	
	// method 2

	// course.set(
	// 	{
	// 		isPublished:true,
	// 		author:'Another user'
	// 	}
	// )
}

updateCourse('5c85001346c4215ba981f296')

async function updateCourse2(id){
	// 
	// update object directly
	const result = await Course.update({_id:id},{
		$set:{
			author:'Mosh',
			isPublished:false
		}
	});
	console.log(result)
	// update and return object
	const result2 = await Course.findOneAndUpdate(id,{
		$set:{
			author:"Updated",
			isPublished:true
		}
	})

	console.log(result2)

};

// updateCourse2('5c85001346c4215ba981f296');

// removing an object

async function removeCourse(id){
	// 
	// update object directly
	// const result = await Course.deleteOne({_id:id})
	const course = await Course.findByIdAndDelete(id)
	console.log(course)


};

removeCourse('5c85001346c4215ba981f296');