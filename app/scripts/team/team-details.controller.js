(function () {
	'use strict';

	angular
		.module('mustDoApp')
		.controller('TeamDetailsController', TeamDetailsController);

	TeamDetailsController.$inject = [
		'$scope',
		'toaster',
		'Team',
		'team',
		'identity'];

	function TeamDetailsController($scope, toaster, Team, team, identity) {
		$scope.team = teamWithoutLoggedUser(team);
		$scope.removeMember = removeMember;
		$scope.addMember = addMember;


		function teamWithoutLoggedUser(team) {
			var newTeam = angular.copy(team);

			for (var i =0; i < newTeam.members.length; i++) {
				if (newTeam.members[i].id === identity.id) {
					newTeam.members.splice(i, 1);
					break;
				}
			}

			return newTeam;
		}

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
				$scope.team = teamWithoutLoggedUser(team);
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
