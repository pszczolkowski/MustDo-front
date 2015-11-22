(function () {
	'use strict';

	angular
		.module('mustDoApp')
		.factory('Task', Task);

	Task.$inject = ['$resource', 'config'];

	function Task($resource, config) {
		return $resource(config.apiUrl + '/task/:taskId', {}, {
			update: {
				url: config.apiUrl + '/task',
				method: 'PUT'
			}
		});
	}
})();
