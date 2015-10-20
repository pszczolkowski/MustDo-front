(function () {
	'use strict';

	angular
		.module('mustDoApp')
		.controller('BoardRemoveModalController', BoardRemoveModalController);

	BoardRemoveModalController.$inject = [
		'$scope',
		'$modalInstance',
		'toaster',
		'Board',
		'board'];

	function BoardRemoveModalController($scope, $modalInstance, toaster, Board, board) {
		$scope.board = board;
		$scope.remove = remove;


		function remove() {
			Board.delete({
				boardId: board.id
			}).$promise.then(function () {
				$modalInstance.close();
			}, function () {
				toaster.pop('error', 'Failure', 'Could not remove board');
			});
		}
	}
})();
