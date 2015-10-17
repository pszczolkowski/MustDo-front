(function () {
	'use strict';

	angular
		.module('mustDoApp')
		.factory('Board', Board);

	Board.$inject = ['$resource'];

	function Board($resource) {
		return $resource('/api/board/:boardId', {}, {
			update: {
				url: '/api/board',
				method: 'PUT'
			}
		});
	}
})();
