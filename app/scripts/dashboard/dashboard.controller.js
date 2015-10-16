(function () {
	'use strict';

	angular
		.module('mustDoApp')
		.controller('DashboardController', DashboardController);

	DashboardController.$inject = [
		'$scope',
		'BoardWizard',
		'Board',
		'boards'];

	function DashboardController($scope, BoardWizard, Board, boards) {
		$scope.boards = boards;
		$scope.openBoardWizard = openBoardWizard;


		function openBoardWizard() {
			BoardWizard.open()
				.then(reloadBoards);
		}

		function reloadBoards() {
			Board.query().$promise
				.then(function (boards) {
					$scope.boards = boards;
				});
		}
	}
})();
