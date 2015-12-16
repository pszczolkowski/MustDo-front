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
			},
			makePublic: {
				url: config.apiUrl + '/board/:boardId/markAsPublic',
				method: 'POST',
				params: {
					boardId: '@boardId'
				}
			},
			makePrivate: {
				url: config.apiUrl + '/board/:boardId/markAsPrivate',
				method: 'POST',
				params: {
					boardId: '@boardId'
				}
			}
		});
	}
})();
