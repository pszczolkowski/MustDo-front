(function () {
	'use strict';

	angular
		.module('mustDoApp')
		.factory('File', File);

	File.$inject = ['$resource', 'config'];

	function File($resource, config) {
		return $resource(config.apiUrl + '/file/:fileId');
	}
})();
