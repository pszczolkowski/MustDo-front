(function () {
	'use strict';

	angular
		.module('mustDoApp')
		.controller('TaskWizardController', TaskWizardController);

	TaskWizardController.$inject = [
		'$scope',
		'$modalInstance',
		'toaster',
		'Task',
		'list'];

	function TaskWizardController($scope, $modalInstance, toaster, Task, list) {
		$scope.title = '';
		$scope.create = create;


		function create() {
			var task = new Task();
			task.title = $scope.title;
			task.listId = list.id;

			task.$save()
				.then(function (createdTask) {
					$modalInstance.close(createdTask);
				}, function () {
					toaster.pop('error', 'Failure', 'Could not create new task');
				});
		}
	}
})();
