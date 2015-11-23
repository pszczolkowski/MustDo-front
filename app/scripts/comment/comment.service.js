(function () {
	'use strict';

	angular
		.module('mustDoApp')
		.factory('Comment', Comment);

	Comment.$inject = ['$resource', 'config'];

	function Comment($resource, config) {
		return $resource(config.apiUrl + '/comment/:taskId');
	}
})();
