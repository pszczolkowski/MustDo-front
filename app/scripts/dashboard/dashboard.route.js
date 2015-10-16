(function () {
	'use strict';

	angular
		.module('mustDoApp')
		.config(DashboardRouteProvider);

	DashboardRouteProvider.$inject = ['$stateProvider'];

	function DashboardRouteProvider($stateProvider) {
		var resolveBoards = ['Board', loadBoards];

		$stateProvider.state('dashboard', {
			url: '/',
			templateUrl: 'views/dashboard/dashboard.html',
			controller: 'DashboardController',
			resolve: {
				boards: resolveBoards
			}
		});


		function loadBoards(Board) {
			return Board.query().$promise;
		}
	}
})();
