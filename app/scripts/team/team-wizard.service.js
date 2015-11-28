(function () {
	'use strict';

	angular
		.module('mustDoApp')
		.factory('TeamWizard', TeamWizard);

	TeamWizard.$inject = ['$uibModal'];

	function TeamWizard($uibModal) {
		return {
			open: open
		};


		function open() {
			return $uibModal.open({
				templateUrl: 'views/team/wizard.html',
				controller: 'TeamWizardController',
				size: 'lg'
			}).result;
		}
	}
})();
