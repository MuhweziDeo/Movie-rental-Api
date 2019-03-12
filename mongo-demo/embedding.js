const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  // validate
  author:{
    type:authorSchema,
    required:true
  }
}));

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateCourse(courseId){
  // method-1
  // const course = await Course.findById(courseId)

  // course.author.name = "Dee updted 2";
  // const result = await course.save() ;
  // console.log(result)

  // method-2

  const course = await Course.update({_id:courseId}, {
    $set:{
      'author.name':"dee update3"
    }
  })

  console.log(course);

}

updateCourse('5c874e11f97a7949dd84e1b8')
// listCourses();
// createCourse('Node Course', new Author({ name: 'Mosh' }));
