

(function(){


	app.controller('DetailController',function($scope,$routeParams,search){
	    console.log($routeParams.testid);
		search.id($routeParams.testid).then(function(data){
	    $scope.item=data;
	    });
	});

})();	
