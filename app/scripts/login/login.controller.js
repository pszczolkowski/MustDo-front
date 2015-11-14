(function () {
	'use strict';

	angular
		.module('mustDoApp')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$scope', '$rootScope', '$state', 'Auth'];

	function LoginController($scope, $rootScope, $state, Auth) {
		$scope.login = login;


		function login(event) {
			event.preventDefault();

			Auth.login({
				username: $scope.username,
				password: $scope.password,
				rememberMe: $scope.rememberMe
			}).then(function () {
				$scope.authenticationError = false;
				if ($rootScope.previousStateName === 'register') {
					$state.go('dashboard');
				} else {
					$rootScope.back();
				}
			}).catch(function () {
				$scope.authenticationError = true;
			});
		}
	}
})();
