var app = angular.module('mySong', []);
app.controller('showlist', function($scope, $http) {
   $http.post("/back/songs/ajaxGetStats")
   .then(function (response) {$scope.total = response.data.records;});
    $http.post("/back/songs/ajaxGetList")
   .then(function (response) {$scope.list = response.data.records;});  
     
      $scope.submit = function() {
				var request = $http({
                    method: "post",
                    url: "/back/songs/addsong",
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' },                 
                    data: {
                        artist: $scope.artist,
                        track: $scope.track,
                        linkv: $scope.linkv
                    }
                }).then(function (response) {
					location.reload();			
				});

	  }
	  
      $scope.edit = function(tid) {
				 $http({
                    method: "post",
                    url: "/back/songs/editsong",
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' },                 
                    data: {
                        id: tid
                    }
                }).then(function (response) {
					$scope.song_id = response.data.id;
					$scope.updateartist = response.data.artist;
					$scope.updatetrack = response.data.track;
					$scope.updatelink = response.data.link;					
				});
				

	  }	 


      $scope.update = function() {
		  
				if($scope.song_id =="" || $scope.song_id == undefined){

					alert('select song firstly');
			
					
				}else{
						var request = $http({
							method: "post",
							url: "/back/songs/updatesong",
							headers: { 'Content-Type': 'application/x-www-form-urlencoded' },                 
							data: {
								id: $scope.song_id,
								artist: $scope.updateartist,
								track: $scope.updatetrack,
								linkv: $scope.updatelink
							}
						}).then(function (response) {
							location.reload();					
						});				

				}
				


	  }	  
});
     
