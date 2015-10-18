(function () {
	'use strict';

	var config = {
		apiUrl: 'http://localhost:8080/mustdo/api'
	};

	angular
		.module('mustDoApp')
		.constant('config', config)
		.config(configure);

	configure.$inject = [
		'$urlRouterProvider'
	];

	function configure($urlRouterProvider) {
		$urlRouterProvider.otherwise('/');
	}

})();

