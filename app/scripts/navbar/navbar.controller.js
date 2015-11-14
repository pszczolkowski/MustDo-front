(function () {
	'use strict';

	angular
		.module('mustDoApp')
		.controller('NavbarController', NavbarController);

	NavbarController.$inject = [
		'$scope',
		'$state',
		'Auth',
		'Principal',
		'toaster'];

	function NavbarController($scope, $state, Auth, Principal, toaster) {
		$scope.logout = logout;

		Principal.identity().then(function (identity) {
			$scope.identity = identity;
		});

		$scope.$on('loginSuccess', function (eventm, identity) {
			$scope.identity = identity;
		});


		function logout() {
			Auth.logout();
			$scope.identity = null;

			toaster.pop('success', 'Logged out');
			$state.go('login');
		}
	}
})();
