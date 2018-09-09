
(function(){

	app.controller('CartController',function($scope,mycache,arraysearch,addmince){
	
	$scope.lists=mycache.get('cart');
	
	
	$scope.amount={};
	var totalcount =arraysearch.total($scope.lists);
	$scope.total= totalcount;

	
	
	
	
	$scope.add = function(id){
		var check = addmince.check(id,$scope.amount,$scope.lists,1);
		if(check.type == 0){
		$scope.warning = check.msg;
		}
		if(check.type == 1){
						$scope.lists[check.index].amount = check.xamount;
						mycache.set('cart',$scope.lists);
						delete $scope.amount[id];
						totalcount =arraysearch.total($scope.lists);
						$scope.total= totalcount;						
		}
	};

	
	$scope.mince= function(id){
	
		var check = addmince.check(id,$scope.amount,$scope.lists,2);
		if(check.type == 0){
		$scope.warning = check.msg;
		}
		if(check.type == 1){
						$scope.lists[check.index].amount = check.xamount;
						mycache.set('cart',$scope.lists);
						delete $scope.amount[id];
						totalcount =arraysearch.total($scope.lists);
						$scope.total= totalcount;						
		}			
	};	
	
	$scope.del=function(id){
		var itemindex =arraysearch.search(id,$scope.lists);
				if(itemindex  == -1){
					  $scope.warning = "error the product can't be find";
					  return false;					
				
				}else{
				    $scope.lists.splice(itemindex,1);
					mycache.set('cart',$scope.lists);
					console.log( $scope.lists);
					totalcount =arraysearch.total($scope.lists);
					$scope.total= totalcount;
				}		
	};
	
	
	});	


})();	

