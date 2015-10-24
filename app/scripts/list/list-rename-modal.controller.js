(function () {
	'use strict';

	angular
		.module('mustDoApp')
		.controller('ListRenameModalController', ListRenameModalController);

	ListRenameModalController.$inject = [
		'$scope',
		'$modalInstance',
		'toaster',
		'List',
		'list'];

	function ListRenameModalController($scope, $modalInstance, toaster, List, list) {
		$scope.list = list;
		$scope.name = list.name;
		$scope.rename = rename;


		function rename() {
			var list = new List();
			angular.extend(list, $scope.list);
			list.name = list.name;

			list.$update().then(function () {
				$modalInstance.close();
			}, function () {
				toaster.pop('error', 'Failure', 'Could not rename list');
			});
		}
	}
})();
