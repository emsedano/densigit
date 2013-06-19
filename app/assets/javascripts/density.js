var Density = (function(){  
	
	var BY_DAY = "day";
	var BY_USER = "user";

	var commitsPerDay = function( data ){
		
	}

	var commitsPerUser = function( data ){
		
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