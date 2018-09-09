(function(){
		var getlist= function($http,$log){
		       return $http({
					method : "GET",
					url : "http://localhost/angular_shoppingcart_php_dpo/api/"
				}).then(onsuccssful , onerror);
		}
		var onsuccssful = function(response){
		return response.data.records;
		
		};
		var onerror = function(response){
		$log.info( response.statusText);
		
		};		
		app.factory('list',getlist);
		
		var search= function($http,$log){
	        var id = function(testid){
				return $http({
					method : "GET",
					url : "http://localhost/angular_shoppingcart_php_dpo/api/searchbyid/"+testid
				}).then(onsuccssful , onerror);			
			};
			var onsuccssful = function(response){
			return response.data;
			
			};
			var onerror = function(response){
			$log.info( response.statusText);
			
			};	
			return {
			id:id
			}
		}
		
		app.factory('search',search);		
		
		var mycache= function($window){
				//var cache=$cacheFactory('mycache',{storageMode:'localStorage'});
				var set= function(name,value){
				//cache.put(name,value);
				$window.localStorage.setItem(name, JSON.stringify(value));
				}
				var get = function(name){
				 //return cache.get(name);
				 var text= $window.localStorage.getItem(name);
				 if(text){
				 var newtext =  JSON.parse(text);
				 }else{
				 var newtext ='';
				 }
				 return newtext;
				}
				var clear = function(name){
                   $window.localStorage.removeItem(name);
				}				
				return {
				set:set,
				clear:clear,
				get:get
				};
				
			 /* var context = [];
			  var set = function(key, value) {
				var data = {
				  key: key,
				  value: value
				};
				context.push(data);
			  }
			  var get = function(key) {
	
				var data =context.find(function(element) {
				  return element.key == key;
				});
				return data;
			  }

			  return {
				get: get,
				set: set
			  }	
*/			  
		}
			
		app.factory('mycache',mycache);		
		

		var arraysearch= function(){
				var search =function(id,array){
						var i;
						var returnindex =-1 ;
						for (i = 0; i < array.length; i++) { 
							if(array[i].id == id ){
								returnindex = i;
							}
						}
						if(returnindex !=-1){
						return returnindex;
						}else{
						return -1;
						}				
				};

				var total =function(array){
					  var totalno=0;
						var i;
						for (i = 0; i < array.length; i++) { 
							 var cost =Number(array[i].amount) * Number(array[i].price);
							 totalno =totalno +cost;
						}
					  return totalno;			
				};				
				
				return {
				search:search,
				total:total
				}
					  
		}
			
		app.factory('arraysearch',arraysearch);	
		
		
		var addmince= function(arraysearch){
				var type =0 ;//1 pass ,0 false
				var msg='';
				var xamount;
				var index;
				var check = function(id,amount,array,state){ //state 1 is add, 2 is mince
								if(!amount[id]){
									msg = "should enter amount";
									return false;
								}
								if(amount[id] < 0 || amount[id] == 0){
									  msg = "should enter amount bigger than zero";
									  return false;			
								}	

								var itemindex =arraysearch.search(id,array);
								if(itemindex  == -1){
									  msg = "error the product can't be find";
									  return false;					
								
								}

								if(state == 1){
										var newamount =array[itemindex].amount + amount[id];
										if(amount[id] > array[itemindex].stock || newamount > array[itemindex].stock){
										  msg = "the stock is"+array[itemindex].stock;
										  return false;					
										}else{
										 type =1;
										 index =itemindex;
										 xamount = newamount;
										}								
								}
								if(state == 2){
										 var newamount =array[itemindex].amount - amount[id];
										if( newamount < 1){
										  msg = "at least one";
										  return false;					
										}else{
										 type =1;
										 index =itemindex;
										 xamount = newamount;										 
										}								
								}
							return{
							type:type,
							msg:msg,
							index:index,
							xamount:xamount
							}	
				
				};
				
				return {
				check:check

				}
					  
		}
			
		app.factory('addmince',addmince);			

		
})();