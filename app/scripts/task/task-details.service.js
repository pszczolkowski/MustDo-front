(function () {
	'use strict';

	angular
		.module('mustDoApp')
		.factory('TaskDetails', TaskDetails);

	TaskDetails.$inject = ['$uibModal'];

	function TaskDetails($uibModal) {
		return {
			open: open
		};


		function open(task) {
			return $uibModal.open({
				templateUrl: 'views/task/details.html',
				controller: 'TaskDetailsController',
				size: 'lg',
				resolve: {
					task: function () {
						return task;
					}
				}
			}).result;
		}
	}
})();
