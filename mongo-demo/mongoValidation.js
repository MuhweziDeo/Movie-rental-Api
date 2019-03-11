const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground').
then(()=>{console.log('connected')})
.catch(err=>console.log(err));

// table
// const courseSchema = new mongoose.Schema({
// 	name:{type:String, required:true},
// 	author:String,
// 	tags:[String],
// 	date:{
// 		type:Date,
// 		default:Date.now
// 	},
// 	isPublished:Boolean,
//   price:{type:Number, required:function(){return this.isPublished}}
// })
const courseSchema = new mongoose.Schema({
  // advanced validations
	name:{type:String,
    required:true,
    minlength:5,
    maxlength:255
  },
  category:{
    type:String,
    required:true,
    enum:['web','mobile','network']
  },
	author:String,
	tags:[String],
	date:{
		type:Date,
		default:Date.now
	},
	isPublished:Boolean,
  price:{type:Number, required:function(){return this.isPublished}}
})

// create collection / table
const Course = mongoose.model('Course',courseSchema);

// insert data
async function createCourse(){
	const course = new Course({
  name:"ddd",
	author:'Strin2g',
	tags:['dde2','sss2'],
	isPublished:true,
  price:400,
  category:"-"
});

try {
  const result = await course.save()
  console.log(result)
} catch (e) {
  console.log(e)
}


}

// insert data
createCourse()
