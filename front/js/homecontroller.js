	
(function(){

	app.controller('HomeController',function($scope,list,mycache,arraysearch){
	list.then(function(data){
			$scope.alllist=data;
	
			$scope.pageSize = 5;
            $scope.pages = Math.ceil($scope.alllist.length / $scope.pageSize); 
           
            $scope.pageList = [];
            $scope.selPage = 1;
            
            $scope.setData = function () {
                $scope.items = $scope.alllist.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize));
            }
            $scope.items = $scope.alllist.slice(0, $scope.pageSize);	
	
			
            for (var i = 0; i < $scope.pages; i++) {
                $scope.pageList.push(i + 1);
            }
           
            $scope.selectPage = function (page) {
                
                if (page < 1 || page > $scope.pages) return;
              
                if (page > 2) {
                  
                    var newpageList = [];
                    for (var i = (page - 3) ; i < ((page + 2) > $scope.pages ? $scope.pages : (page + 2)) ; i++) {
                        newpageList.push(i + 1);
                    }
                    $scope.pageList = newpageList;
                }
                $scope.selPage = page;
                $scope.setData();
                $scope.isActivePage(page);
                console.log("select£º" + page);
            };	
            $scope.isActivePage = function (page) {
                return $scope.selPage == page;
            };
           
            $scope.Previous = function () {
                $scope.selectPage($scope.selPage - 1);
            }
            
            $scope.Next = function () {
                $scope.selectPage($scope.selPage + 1);
            };	
			$scope.checkshow=false;
			$scope.show=function(id,stock,price,track){
				$scope.id=id;
				$scope.stock=stock;
				$scope.price=price;
				$scope.checkshow=true;
				$scope.track=track;
			};
		


			
			var checkcache =mycache.get('cart');
			if(checkcache){
			var cartlist=checkcache;
			}else{
			var cartlist=[];
			}
			
			
			$scope.buy=function(){
				if($scope.id){
					if($scope.amount < 0 || $scope.amount == 0)
					{
						$scope.warning="error:amount can't  be less than zero";
						return false;					
					}else{
							if($scope.amount > $scope.stock){
								$scope.warning='error:stock is'+$scope.stock+",can't be more";
								return false;
							}else{
								var itemindex =arraysearch.search($scope.id,cartlist);
								if(itemindex  == -1){
									var cart={};
									cart.id=$scope.id;
									cart.amount=$scope.amount;
									cart.price=$scope.price;
									cart.stock=$scope.stock;
									cart.track=$scope.track;									
									cartlist.push(cart); 
									console.log( cartlist);
									//var newcartlist = JSON.stringify(cartlist);
									var test =mycache.set('cart',cartlist);
									console.log( mycache.get('cart'));
									alert('successful!');
									$scope.checkshow=false;	
								}else{

								$scope.warning="the product has been in the cart";
								return false;
								
								}							
							}				
					}

				}else{
				$scope.warning='error:no id,select product first';
				return false;
				}
			};

			$scope.clear= function(name){
			  mycache.clear(name);
			}	
	});
	

		
		
		
	});


})();	
