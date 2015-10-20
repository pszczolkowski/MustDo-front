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
		'board'];

	function BoardNavbarFragmentController($scope, $state, toaster, BoardWizard, board) {
		$scope.board = board;
		$scope.openRenameModal = openRenameModal;
		$scope.openRemoveModal = openRemoveModal;


		function openRenameModal() {
			BoardWizard.rename($scope.board)
				.then(function () {
					toaster.pop('success', 'Renamed', 'Board has been renamed');
				});
		}

		function openRemoveModal() {
			BoardWizard.remove($scope.board)
				.then(function () {
					toaster.pop('success', 'Deleted', 'Board has been deleted');
					$state.go('dashboard');
				});
		}
	}
})();
