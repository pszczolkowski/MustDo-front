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
		'TeamWizard',
		'Board',
		'boards',
		'teams'];

	function DashboardController($scope, $state, toaster, BoardWizard, TeamWizard, Board, boards, teams) {
		$scope.boards = boards;
		$scope.teams = teams;
		$scope.openBoardWizard = openBoardWizard;
		$scope.openBoard = openBoard;
		$scope.openRenameModal = openRenameModal;
		$scope.openRemoveModal = openRemoveModal;
		$scope.openTeam = openTeam;
		$scope.openTeamWizard = openTeamWizard;


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

		function openTeam(team) {
			$state.go('team', {teamId: team.id});
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

		function openTeamWizard() {
			TeamWizard.open()
				.then(function (team) {
					toaster.pop('success', 'Created', 'New team has been created');
					openTeam(team);
				});
		}

		function reloadTeams() {
			Team.query().$promise
				.then(function (teams) {
					$scope.teams = teams;
				});
		}
	}
})();
