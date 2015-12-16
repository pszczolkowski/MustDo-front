(function () {
	'use strict';

	angular
		.module('mustDoApp')
		.factory('User', User);

	User.$inject = ['$resource', 'config'];

	function User($resource, config) {
		return $resource(config.apiUrl + '/user');
	}
})();
