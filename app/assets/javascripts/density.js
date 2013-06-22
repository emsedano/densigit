var Density = (function(){  
	
	var BY_DAY = "day";
	var BY_USER = "user";

	var commitsPerDay = function( data ){
		var store = {};

		for( idx in data){
			
			var commit = data[idx].commit.committer;

			var d = new Date(commit.date);
			var ds = d.toLocaleDateString();
			
			//Start counting
			if(!store[ds])
				store[ds] = 1;
			else
				store[ds] += 1;
			
		}
		return store;
	}

	var commitsPerUser = function( data ){

		var store = {};

		for( idx in data){
			
			var commit = data[idx].commit.committer;

			var ds = commit.name;

			//Start counting
			if(!store[ds])
				store[ds]= 1;
			else
				store[ds] += 1;
			
		}
		return store;
		
	}

	return {

		url: function(user, repo){
			return 'https://api.github.com/repos/'+ user+'/'+repo+'/commits';
		},

		extractTopic : function (topic, data){

			if(topic == BY_DAY )
				return commitsPerDay(data);
			else if (topic == BY_USER)
				return commitsPerUser(data);
			else
				return null;
		}
	}  
})(); 