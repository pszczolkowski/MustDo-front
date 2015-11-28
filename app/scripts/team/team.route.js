(function () {
	'use strict';

	angular
		.module('mustDoApp')
		.config(TeamRouteProvider);

	TeamRouteProvider.$inject = ['$stateProvider'];

	function TeamRouteProvider($stateProvider) {
		var resolveTeam = ['$stateParams', 'Team', loadTeam];

		$stateProvider.state('team', {
			parent: 'root',
			url: '/team/{teamId}',
			controller: 'TeamDetailsController',
			templateUrl: 'views/team/team.html',
			resolve: {
				team: resolveTeam
			}
		});


		function loadTeam($stateParams, Team) {
			return Team.get({
				teamId: $stateParams.teamId
			}).$promise;
		}
	}
})();
