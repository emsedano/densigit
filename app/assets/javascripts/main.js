

$('#myTab a').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
});

$('#analyze').click(function (e) {
  var gituser = $("input[name=gituser]").val();
  var repo = $("input[name=repository]").val();

  if(gituser && repo){
  	alert("analizing " + Density.url(gituser, repo));
  	$.getJSON( Density.url(gituser, repo), function(data) {
		  
		  //var charData = Density.getCharData("day", data);
		  $("#day p").text(data);
		  $("#commiter p").text(data);
		  
		});

  }else{
  	alert("please fill github user and repository name");
  }
  	

});




