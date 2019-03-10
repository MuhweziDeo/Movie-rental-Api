console.log('First')
getUser(1,getRepositories);
console.log('Last')

function getRepositories(user){
	getRepositories(user.user,getCommits)

}

function getCommits(repoz){
	getCommits(repo,displayCommits)
}


function displayCommits(commits){
	console.log(commits)
}




function getUser(id,callback){
	setTimeout(()=>{
		console.log('reading user from db')
	callback({
			id:id,
			user:"dee"
		}) 
	},2000);
}

// callback functions
function getRepoz(username,callback){
	setTimeout(()=>{
		console.log('fetcing repos')
		callback(['1',2,3])
	},2000);
	
}