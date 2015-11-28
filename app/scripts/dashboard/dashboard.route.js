(function () {
	'use strict';

	angular
		.module('mustDoApp')
		.config(DashboardRouteProvider);

	DashboardRouteProvider.$inject = ['$stateProvider'];

	function DashboardRouteProvider($stateProvider) {
		var resolveBoards = ['Board', loadBoards];
		var resolveTeams = ['Team', loadTeams];

		$stateProvider.state('dashboard', {
			parent: 'root',
			url: '/',
			templateUrl: 'views/dashboard/dashboard.html',
			controller: 'DashboardController',
			resolve: {
				boards: resolveBoards,
				teams: resolveTeams
			}
		});


		function loadBoards(Board) {
			return Board.query().$promise;
		}

		function loadTeams(Team) {
			return Team.query().$promise;
		}
	}
})();
