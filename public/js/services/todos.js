angular.module('foodService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Food', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/food');
			},
			create : function(foodData) {
				return $http.post('/api/food', foodData);
			},
			delete : function(id) {
				return $http.delete('/api/food/' + id);
			},
			update : function(id, foodData) {
				return $http.put('/api/food/' + id, foodData);
			},
			total : function(){
				console.log('I am in todo.js/total');
				return $http.get('api/total');
			},
			//api for menu
			getMenu : function(){
				return $http.get('/api/menu');
			},
			createMenu : function(menuData){
				console.log('createMenu');
				return $http.post('/api/menu', menuData);
			},
			deleteMenu : function(id) {
				return $http.delete('/api/menu/' + id);
			},
			updateMenu : function(id, menuData) {
				return $http.put('/api/menu/' + id, menuData);
			}
		}
	}]);