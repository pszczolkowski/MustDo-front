(function () {
	'use strict';

	angular
		.module('mustDoApp')
		.factory('BoardWizard', BoardWizard);

	BoardWizard.$inject = ['$uibModal'];

	function BoardWizard($uibModal) {
		return {
			open: open,
			rename: rename,
			remove: remove
		};


		function open() {
			return $uibModal.open({
				templateUrl: 'views/board/wizard.html',
				controller: 'BoardWizardController',
				size: 'lg'
			}).result;
		}

		function rename(board) {
			return $uibModal.open({
				templateUrl: 'views/board/rename-modal.html',
				controller: 'BoardRenameModalController',
				size: 'lg',
				resolve: {
					board: function () {
						return board;
					}
				}
			}).result;
		}

		function remove(board) {
			return $uibModal.open({
				templateUrl: 'views/board/remove-modal.html',
				controller: 'BoardRemoveModalController',
				size: 'lg',
				resolve: {
					board: function () {
						return board;
					}
				}
			}).result;
		}
	}
})();
