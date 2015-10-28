(function () {
	'use strict';

	angular
		.module('mustDoApp')
		.controller('ListWizardController', ListWizardController);

	ListWizardController.$inject = [
		'$scope',
		'$modalInstance',
		'toaster',
		'List',
		'board'];

	function ListWizardController($scope, $modalInstance, toaster, List, board) {
		$scope.name = '';
		$scope.create = create;


		function create() {
			var list = new List();
			list.name = $scope.name;
			list.boardId = board.id;

			list.$save()
				.then(function (createdList) {
					$modalInstance.close(createdList);
				}, function (error) {
					toaster.pop('error', 'Failure', 'Could not create new list');
				});
		}
	}
})();
