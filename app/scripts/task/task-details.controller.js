(function () {
	'use strict';

	angular
		.module('mustDoApp')
		.controller('TaskDetailsController', TaskDetailsController);

	TaskDetailsController.$inject = [
		'$scope',
		'$modalInstance',
		'toaster',
		'Task',
		'task'];

	function TaskDetailsController($scope, $modalInstance, toaster, Task, task) {
		$scope.title = task.title;
		$scope.save = save;
		$scope.remove = remove;


		function save() {
			Task.update({
				id: task.id,
				title: $scope.title
			}).$promise
				.then(function () {
					toaster.pop('success', 'Task has been saved');
					$modalInstance.close();
				}, function () {
					toaster.pop('error', 'Some error occured');
				});
		}

		function remove() {
			Task.delete({taskId: task.id}).$promise
				.then(function () {
					toaster.pop('success', 'Task has been deleted');
					$modalInstance.close();
				}, function () {
					toaster.pop('error', 'Some error occured');
				});
		}
	}
})();
