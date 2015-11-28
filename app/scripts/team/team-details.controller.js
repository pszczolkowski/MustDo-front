(function () {
	'use strict';

	angular
		.module('mustDoApp')
		.controller('TeamDetailsController', TeamDetailsController);

	TeamDetailsController.$inject = [
		'$scope',
		'toaster',
		'Team',
		'team'];

	function TeamDetailsController($scope, toaster, Team, team) {
		$scope.team = team;
		$scope.removeMember = removeMember;
		$scope.addMember = addMember;


		function removeMember(member) {
			Team.removeMember({
				userId: member.id,
				teamId: $scope.team.id
			}).$promise.then(function () {
				toaster.pop('success', 'Team member removed');
				reloadTeam();
			});
		}

		function reloadTeam() {
			Team.get({
				teamId: $scope.team.id
			}).$promise.then(function (team) {
				$scope.team = team;
			});
		}

		function addMember() {
			if (!$scope.newMember) {
				return;
			}

			Team.addMember({
				teamId: $scope.team.id,
				login: $scope.newMember
			}).$promise.then(function () {
				toaster.pop('success', 'Team member added');
				reloadTeam();
			}, function () {
				toaster.pop('error', 'User with given login doesn\'t exist');
			});
		}
	}
})();
