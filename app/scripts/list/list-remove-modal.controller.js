(function () {
	'use strict';

	angular
		.module('mustDoApp')
		.controller('ListRemoveModalController', ListRemoveModalController);

	ListRemoveModalController.$inject = [
		'$scope',
		'$modalInstance',
		'toaster',
		'List',
		'list'];

	function ListRemoveModalController($scope, $modalInstance, toaster, List, list) {
		$scope.list = list;
		$scope.remove = remove;


		function remove() {
			List.delete({
				listId: list.id
			}).$promise.then(function () {
				$modalInstance.close();
			}, function () {
				toaster.pop('error', 'Failure', 'Could not delete list');
			});
		}
	}
})();
