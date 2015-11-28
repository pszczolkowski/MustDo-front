(function () {
	'use strict';

	angular
		.module('mustDoApp')
		.controller('BoardWizardController', BoardWizardController);

	BoardWizardController.$inject = [
		'$scope',
		'$modalInstance',
		'toaster',
		'Board'];

	function BoardWizardController($scope, $modalInstance, toaster, Board) {
		$scope.name = '';
		$scope.team = '';
		$scope.create = create;


		function create() {
			var board = new Board();
			board.name = $scope.name;
			board.teamName = $scope.team;

			board.$save()
				.then(function (createdBoard) {
					$modalInstance.close(createdBoard);
				}, function (error) {
					toaster.pop('error', 'Failure', 'Could not create new board');
				});
		}
	}
})();
