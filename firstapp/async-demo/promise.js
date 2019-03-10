const p = new Promise((resolve,reject)=>{

setTimeout(()=>{
	// resolve promise
 resolve(1)
 // reject error
 reject(new Error('message'))
},2000);

});

p.then(result=>{console.log(result)}).catch(err=>console.log(err))

