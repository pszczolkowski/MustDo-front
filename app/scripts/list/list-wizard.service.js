(function () {
	'use strict';

	angular
		.module('mustDoApp')
		.factory('ListWizard', ListWizard);

	ListWizard.$inject = ['$uibModal'];

	function ListWizard($uibModal) {
		return {
			open: open,
			rename: rename,
			remove: remove
		};


		function open(board) {
			return $uibModal.open({
				templateUrl: 'views/list/wizard.html',
				controller: 'ListWizardController',
				size: 'lg',
				resolve: {
					board: function () {
						return board;
					}
				}
			}).result;
		}

		function rename(list) {
			return $uibModal.open({
				templateUrl: 'views/list/rename-modal.html',
				controller: 'ListRenameModalController',
				size: 'lg',
				resolve: {
					list: function () {
						return list;
					}
				}
			}).result;
		}

		function remove(list) {
			return $uibModal.open({
				templateUrl: 'views/list/remove-modal.html',
				controller: 'ListRemoveModalController',
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
