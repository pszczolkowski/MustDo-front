(function () {
	'use strict';

	angular
		.module('mustDoApp')
		.controller('TeamWizardController', TeamWizardController);

	TeamWizardController.$inject = [
		'$scope',
		'$modalInstance',
		'toaster',
		'Team'];

	function TeamWizardController($scope, $modalInstance, toaster, Team) {
		$scope.name = '';
		$scope.create = create;


		function create() {
			var team = new Team();
			team.name = $scope.name;

			team.$save()
				.then(function (createdTeam) {
					$modalInstance.close(createdTeam);
				}, function () {
					toaster.pop('error', 'Could not create new team');
				});
		}
	}
})();
