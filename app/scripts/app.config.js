(function () {
	'use strict';

	angular
		.module('mustDoApp')
		.config(configure);

	configure.$inject = [
		'$urlRouterProvider'
	];

	function configure($urlRouterProvider) {
		$urlRouterProvider.otherwise('/');
	}

})();

