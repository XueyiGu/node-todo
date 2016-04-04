angular.module('foodController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Food', function($scope, $http, Food) {
		$scope.formData = {};
		$scope.loading = true;
		$scope.total = 0;

		function init(){
			// GET =====================================================================
			// when landing on the page, get all todos and show them
			// use the service to get all the todos
			Food.get()
				.success(function(data) {
					$scope.foods = data;
					$scope.loading = false;
				});

			Food.total()
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					console.log(data);
					if(data != null && data.length != 0){
						$scope.total = data[0].total; // assign our new list of todos
					}
				});

			}
		init();


		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.addFood = function(food) {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if (food != undefined) {
				$scope.loading = true;
				console.log(food.price);
				// call the create function from our service (returns a promise object)
				Food.create(food)
					// if successful creation, call our get function to get all the new todos
					.success(init);
			}
		};

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteFood = function(food) {
			$scope.loading = true;

			Food.delete(food._id)
				// if successful creation, call our get function to get all the new todos
				.success(init);
		};

		// SELECT ==================================================================
		// select a food after checking it
		$scope.selectFood = function(food) {
			$scope.selectedFoodIndex = $scope.foods.indexOf(food);

			$scope.food = {
				_id: food._id,
				name: food.name,
				price: food.price
			};
		};

		// UPDATE ==================================================================
		// update a food after checking it
		$scope.updateFood = function(food) {
			$scope.loading = true;

			Food.update(food._id, food)
				// if successful creation, call our get function to get all the new todos
				.success(init);
		};

		//options about menu============================================================================
		// get all the menu items form the database
		function getmenu(){
			$scope.menu = null;
			Food.getMenu()
				.success(function(data){
					$scope.menus = data;
				})
		}

		// when open the menu, get all the menu items from database
		$scope.openMenu = function(){
			getmenu();
		};
		// when submitting the add item, send the text to the node API
		$scope.addItem = function(menu) {

			console.log('add item');
			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if (menu != undefined) {
				// call the create function from our service (returns a promise object)
				Food.createMenu(menu)
					// if successful creation, call our get function to get all the new todos
					.success(getmenu);
			}
		};

		// DELETE ==================================================================
		// delete an item
		$scope.deleteItem = function(menu) {

			Food.deleteMenu(menu._id)
				// if successful delete, call our get function to get all the new items
				.success(getmenu);
		};

		// SELECT ==================================================================
		// select an item after checking it
		$scope.selectItem = function(menu) {
			$scope.selectedItemIndex = $scope.menus.indexOf(menu);

			$scope.menu = {
				_id: menu._id,
				name: menu.name,
				price: menu.price
			};
		};

		// UPDATE ==================================================================
		// update an item after checking it
		$scope.updateItem = function(menu) {
			Food.updateMenu(menu._id, menu)
				// if successful update, call our get function to get all the new items
				.success(getmenu);
		};

		//add all the selected item to our food order
		$scope.addSelectedToOrder = function(menus){
			var selected = [];
			for(var u in menus){
				if(menus[u].selected){
					selected.push(menus[u]);
				}
			}
			Food.create(selected)
				.success(init);
		}
	}]);