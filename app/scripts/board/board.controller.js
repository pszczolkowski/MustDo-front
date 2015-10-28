(function () {
	'use strict';

	angular
		.module('mustDoApp')
		.controller('BoardController', BoardController);

	BoardController.$inject = [
		'$scope',
		'toaster',
		'ListWizard',
		'List',
		'board',
		'lists'];

	function BoardController($scope, toaster, ListWizard, List, board, lists) {
		$scope.board = board;
		$scope.lists = lists;
		$scope.openListWizard = openListWizard;
		$scope.openRemoveListModal = openRemoveListModal;
		$scope.openRenameListModal = openRenameListModal;


		function openListWizard() {
			ListWizard.open($scope.board)
				.then(function () {
					toaster.pop('success', 'Created', 'New list has been created');
					reloadLists();
				});
		}

		function reloadLists() {
			List
				.query({boardId: $scope.board.id})
				.$promise
				.then(function (lists) {
					$scope.lists = lists;
				});
		}

		function openRenameListModal(list) {
			ListWizard.rename(list)
				.then(function () {
					toaster.pop('success', 'Renamed', 'List has been renamed');
					reloadList(list);
				});
		}

		function reloadList(list) {
			List
				.get({listId: list.id})
				.$promise
				.then(updateList);
		}

		function updateList(list) {
			for (var i = 0; i < $scope.lists.length; i++) {
				if ($scope.lists[i].id === list.id) {
					$scope.lists[i] = list;
					break;
				}
			}
		}

		function openRemoveListModal(list) {
			ListWizard.remove(list)
				.then(function () {
					toaster.pop('success', 'Deleted', 'List has been deleted');
					removeList(list);
				});
		}

		function removeList(list) {
			for (var i = 0; i < $scope.lists.length; i++) {
				if ($scope.lists[i].id === list.id) {
					$scope.lists.splice(i, 1);
					break;
				}
			}
		}
	}
})();
