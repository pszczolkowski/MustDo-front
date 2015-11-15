(function () {
	'use strict';

	angular
		.module('mustDoApp')
		.factory('TaskWizard', TaskWizard);

	TaskWizard.$inject = ['$uibModal'];

	function TaskWizard($uibModal) {
		return {
			open: open
		};


		function open(list) {
			return $uibModal.open({
				templateUrl: 'views/task/wizard.html',
				controller: 'TaskWizardController',
				size: 'lg',
				resolve: {
					list: function () {
						return list;
					}
				}
			}).result;
		}
	}
})();
