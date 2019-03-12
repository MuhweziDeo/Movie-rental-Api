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
  // author:{
  //   type:authorSchema,
  //   required:true
  // }
  // array of authors
  authors:[authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
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

async function addAuthor (courseId,author) {
  const course = await Course.findById(courseId);
  console.log(course);
  course.authors.push(author);
  const result = await course.save()
  console.log(result);

}
async function removeAuthor (courseId,authorId) {
  const course = await Course.findById(courseId);
  console.log(course.authors);

  const author = await course.authors.id(authorId);
  author.remove()
  const result= await course.save()
  console.log(result);

}

// addAuthor('5c874e11f97a7949dd84e1b8', new Author({
//   name:"another one"
// }))

removeAuthor('5c875100e25dd755ddb78235','5c875100e25dd755ddb78233' )

// updateCourse('5c874e11f97a7949dd84e1b8')
// // listCourses();
// createCourse('Node Course', [new Author({ name: 'Mosh' }),
//   new Author({ name: 'Mosh2' })]);
