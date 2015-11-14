(function () {
	'use strict';

	angular
		.module('mustDoApp')
		.controller('RegisterController', RegisterController);

	RegisterController.$inject = ['$scope', '$rootScope', '$state', 'toaster', 'Auth'];

	function RegisterController($scope, $rootScope, $state, toaster, Auth) {
		$scope.username = '';
		$scope.password = '';
		$scope.confirmPassword = '';
		$scope.submitted = false;
		$scope.errors = {};

		$scope.register = register;


		function register() {
			$scope.submitted = true;

			if ($scope.registerForm.$invalid) {
				return;
			} else if ($scope.password !== $scope.confirmPassword) {
				return;
			}

			$scope.errors = {};

			Auth.createAccount({
				login: $scope.username,
				password: $scope.password
			}).then(function () {
				Auth.login({
					username: $scope.username,
					password: $scope.password,
					rememberMe: false
				}).then(function () {
					toaster.pop('success', 'Successfully registered');
					$state.go('dashboard');
				});
			}).catch(function (reason) {
				if (loginIsAlreadyInUse(reason)) {
					$scope.errors['loginAlreadyInUse'] = true;
				}  else {
					toaster.pop('error', 'Failure', 'Some error occured');
				}
			});
		}

		function loginIsAlreadyInUse(reason) {
			reason = reason.data;

			if (!reason.hasOwnProperty('fieldErrors')) {
				return false;
			}

			for (var i = 0; i < reason.fieldErrors.length; i++) {
				if (reason.fieldErrors[i].field === 'login' && reason.fieldErrors[i].message === 'login already in use') {
					return true;
				}
			}

			return false;
		}
	}
})();
