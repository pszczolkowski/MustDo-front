(function () {
	'use strict';

	angular
		.module('mustDoApp')
		.config(LoginRouteProvider);

	LoginRouteProvider.$inject = ['$stateProvider'];

	function LoginRouteProvider($stateProvider) {
		$stateProvider.state('login', {
			parent: 'root',
			url: '/login',
			templateUrl: 'views/login/login.html',
			controller: 'LoginController'
		});
	}
})();
