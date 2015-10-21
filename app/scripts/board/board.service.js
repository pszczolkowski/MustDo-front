(function () {
	'use strict';

	angular
		.module('mustDoApp')
		.factory('Board', Board);

	Board.$inject = ['$resource', 'config'];

	function Board($resource, config) {
		return $resource(config.apiUrl + '/board/:boardId', {}, {
			update: {
				url: config.apiUrl + '/board',
				method: 'PUT'
			}
		});
	}
})();
