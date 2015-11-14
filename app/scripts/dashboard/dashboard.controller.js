(function () {
	'use strict';

	angular
		.module('mustDoApp')
		.controller('DashboardController', DashboardController);

	DashboardController.$inject = [
		'$scope',
		'$state',
		'toaster',
		'BoardWizard',
		'Board',
		'boards'];

	function DashboardController($scope, $state, toaster, BoardWizard, Board, boards) {
		$scope.boards = boards;
		$scope.openBoardWizard = openBoardWizard;
		$scope.openBoard = openBoard;
		$scope.openRenameModal = openRenameModal;
		$scope.openRemoveModal = openRemoveModal;


		function openBoardWizard() {
			BoardWizard.open()
				.then(function () {
					reloadBoards();
					toaster.pop('success', 'Created', 'New board has been created');
				});
		}

		function reloadBoards() {
			Board.query().$promise
				.then(function (boards) {
					$scope.boards = boards;
				});
		}

		function openBoard(board) {
			$state.go('board', {boardId: board.id, boardName: board.name});
		}

		function openRenameModal(board) {
			BoardWizard.rename(board)
				.then(function () {
					reloadBoards();
					toaster.pop('success', 'Renamed', 'Board has been renamed');
				});
		}

		function openRemoveModal(board) {
			BoardWizard.remove(board)
				.then(function () {
					reloadBoards();
					toaster.pop('success', 'Deleted', 'Board has been deleted');
				});
		}
	}
})();
