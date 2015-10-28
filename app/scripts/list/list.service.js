(function () {
	'use strict';

	angular
		.module('mustDoApp')
		.factory('List', List);

	List.$inject = ['$resource', 'config'];

	function List($resource, config) {
		return $resource(config.apiUrl + '/list/:listId', {}, {
			update: {
				url: config.apiUrl + '/list',
				method: 'PUT'
			}
		});
	}
})();
