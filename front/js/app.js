//(function(){
var app =angular.module('myApp',['ngRoute']);
	
	app.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
		
		$routeProvider
			.when('/main',{
				templateUrl:'view/home.html',
				controller:'HomeController'
			})
			.when('/detail/:testid',{
				templateUrl:'view/detail.html',
				controller:'DetailController'
			})	
			.when('/cart',{
				templateUrl:'view/cart.html',
				controller:'CartController'
			})	
			.otherwise({
			redirectTo:'/main'
			});
	$locationProvider.html5Mode(true);				
	}]);





//})();

