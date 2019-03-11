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
    enum:['web','mobile','network'],
    // strings more
    lowercase:true,
    trim:true
  },
	author:String,
	tags:[String],
	date:{
		type:Date,
		default:Date.now
	},
	isPublished:Boolean,
  price:{type:Number, required:function(){return this.isPublished}
,min:10,
max:200,
get:v=>Math.round(v ),
set:v=>Math.round(v)
}
})

// create collection / table
const Course = mongoose.model('Course',courseSchema);

// insert data
async function createCourse(){
	const course = new Course({
  name:"dddjnj",
	author:'Strin2g',
	tags:['qqsq'],
	isPublished:true,
  price:100.55,
  category:"WEB"
});

try {
  const result = await course.save()
  console.log(result)
} catch (e) {
  // iterate over fields in errors
  for(error in e.errors){
    console.log(e.errors[error].message)
  }
}


}

// insert data
createCourse()
