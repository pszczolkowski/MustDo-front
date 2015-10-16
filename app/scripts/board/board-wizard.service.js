(function () {
	'use strict';

	angular
		.module('mustDoApp')
		.factory('BoardWizard', BoardWizard);

	BoardWizard.$inject = ['$uibModal'];

	function BoardWizard($uibModal) {
		return {
			open: open
		}


		function open() {
			return $uibModal.open({
				templateUrl: 'views/board/wizard.html',
				controller: 'BoardWizardController',
				size: 'lg'
			}).result;
		}
	}
})();
