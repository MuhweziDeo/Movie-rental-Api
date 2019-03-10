// const EventEmitter=require('events');

// const emitter = new EventEmitter();

// // register listener
// emitter.on('messageLogged', (arg) => {
// 	console.log('Listener called',arg) ;
// })
// emitter.emit('messageLogged', {id:1,url:"url"})
// // produce something

const http =require('http');

const server = http.createServer((req,res)=>{
	if(req.url==='/'){
		res.write('Hello world');
		res.end()
	};

	if(req.url=== 'api/courses'){
		res.write('here');
		res.end();
	}
});

server.listen(3000);

console.log('running');