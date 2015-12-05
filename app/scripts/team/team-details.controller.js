(function () {
	'use strict';

	angular
		.module('mustDoApp')
		.controller('TeamDetailsController', TeamDetailsController);

	TeamDetailsController.$inject = [
		'$scope',
		'toaster',
		'Team',
		'User',
		'team',
		'identity'];

	function TeamDetailsController($scope, toaster, Team, User, team, identity) {
		$scope.team = teamWithoutLoggedUser(team);
		$scope.removeMember = removeMember;
		$scope.addMember = addMember;

		loadUsers();


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

		function loadUsers() {
			User.query().$promise
				.then(function (users) {
					$scope.users = getUsersWithoutTeamMembersFrom(users);
				});
		}

		function getUsersWithoutTeamMembersFrom(users) {
			for (var i = 0; i < $scope.team.members.length; i++) {
				for (var j = 0; j < users.length; j++) {
					if ($scope.team.members[i].id === users[j].id) {
						users.splice(j, 1);
						break;
					}
				}
			}

			return users;
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
				$scope.users = getUsersWithoutTeamMembersFrom($scope.users);
			});
		}

		function addMember() {
			if (!$scope.newMember) {
				return;
			}

			Team.addMember({
				teamId: $scope.team.id,
				userId: $scope.newMember.id
			}).$promise.then(function () {
				toaster.pop('success', 'Team member added');
				reloadTeam();
				$scope.newMember = null;
			}, function () {
				toaster.pop('error', 'User with given login doesn\'t exist');
			});
		}
	}
})();
