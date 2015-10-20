(function () {
	'use strict';

	angular
		.module('mustDoApp')
		.controller('BoardRenameModalController', BoardRenameModalController);

	BoardRenameModalController.$inject = [
		'$scope',
		'$modalInstance',
		'toaster',
		'Board',
		'board'];

	function BoardRenameModalController($scope, $modalInstance, toaster, Board, board) {
		$scope.board = board;
		$scope.name = board.name;
		$scope.rename = rename;


		function rename() {
			var board = new Board();
			angular.extend(board, $scope.board);
			board.name = $scope.name;

			board.$update().then(function () {
				$modalInstance.close();
			}, function () {
				toaster.pop('error', 'Failure', 'Could not rename board');
			});
		}
	}
})();
