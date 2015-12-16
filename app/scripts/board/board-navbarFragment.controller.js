(function () {
	'use strict';

	angular
		.module('mustDoApp')
		.controller('BoardNavbarFragmentController', BoardNavbarFragmentController);

	BoardNavbarFragmentController.$inject = [
		'$scope',
		'$state',
		'toaster',
		'BoardWizard',
		'Board',
		'board',
		'team'];

	function BoardNavbarFragmentController($scope, $state, toaster, BoardWizard, Board, board, team) {
		$scope.board = board;
		$scope.team = team;
		$scope.openRenameModal = openRenameModal;
		$scope.openRemoveModal = openRemoveModal;
		$scope.makeItPublic = makeItPublic;
		$scope.makeItAnonymous = makeItAnonymous;


		function openRenameModal() {
			BoardWizard.rename($scope.board)
				.then(function () {
					reloadBoard();
					toaster.pop('success', 'Renamed', 'Board has been renamed');
				});
		}

		function reloadBoard() {
			Board.get({
				boardId: $scope.board.id
			}).$promise.then(function (board) {
				$scope.board = board;
			});
		}

		function openRemoveModal() {
			BoardWizard.remove($scope.board)
				.then(function () {
					toaster.pop('success', 'Deleted', 'Board has been deleted');
					$state.go('dashboard');
				});
		}

		function makeItPublic() {
			Board.makePublic({
				boardId: $scope.board.id
			}).$promise.then(function () {
					toaster.pop('success', 'Published', 'Board has been published');
					reloadBoard();
				}, function () {
					toaster.pop('error', 'Failure', 'Some error occured');
				});
		}

		function makeItAnonymous() {
			Board.makePrivate({
				boardId: $scope.board.id
			}).$promise.then(function () {
					toaster.pop('success', 'Hidden', 'Board has been hidden');
					reloadBoard();
				}, function () {
					toaster.pop('error', 'Failure', 'Some error occured');
				});
		}
	}
})();
