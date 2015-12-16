(function () {
	'use strict';

	angular
		.module('mustDoApp')
		.controller('BoardWizardController', BoardWizardController);

	BoardWizardController.$inject = [
		'$scope',
		'$modalInstance',
		'toaster',
		'Board',
		'Team'];

	function BoardWizardController($scope, $modalInstance, toaster, Board, Team) {
		$scope.name = '';
		$scope.team = null;
		$scope.newTeamName = '';
		$scope.teamOption = 'existing';
		$scope.create = create;
		$scope.teams = Team.query();


		function create() {
			var board = new Board();
			board.name = $scope.name;
			if ($scope.teamOption === 'existing') {
				board.existingTeamId = $scope.team.id;
			} else {
				board.teamName = $scope.newTeamName;
			}

			board.$save()
				.then(function (createdBoard) {
					$modalInstance.close(createdBoard);
				}, function (error) {
					toaster.pop('error', 'Failure', 'Could not create new board');
				});
		}
	}
})();
