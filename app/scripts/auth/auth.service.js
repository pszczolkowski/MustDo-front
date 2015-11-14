(function () {
	'use strict';

	angular
		.module('mustDoApp')
		.factory('Auth', Auth);

	Auth.$inject = ['$rootScope', '$q', '$state', 'AuthServerProvider', 'Principal', 'Account', 'Activate'];

	function Auth($rootScope, $q, $state, AuthServerProvider, Principal, Account, Activate) {
		return {
			login: login,
			logout: logout,
			authorize: authorize,
			createAccount: createAccount,
			updateAccount: updateAccount,
			activateAccount: activateAccount,
			changePassword: changePassword,
			resetPasswordInit: resetPasswordInit,
			resetPasswordFinish: resetPasswordFinish
		};


		function login(credentials, callback) {
			callback = callback || angular.noop;
			var deferred = $q.defer();

			AuthServerProvider.login(credentials).then(function (data) {
				// retrieve the logged account information
				Principal.identity(true).then(function(identity) {
					$rootScope.$broadcast('loginSuccess', identity);
					deferred.resolve(data);
				});
				return callback();
			}).catch(function (err) {
				this.logout();
				deferred.reject(err);
				return callback(err);
			}.bind(this));

			return deferred.promise;
		}

		function logout() {
			AuthServerProvider.logout();
			Principal.authenticate(null);
			// Reset state memory
			$rootScope.previousStateName = undefined;
			$rootScope.previousStateNameParams = undefined;
		}

		function authorize(force) {
			return Principal.identity(force)
				.then(function() {
					var isAuthenticated = Principal.isAuthenticated();

					if ($rootScope.toState.name === 'login' || $rootScope.toState.name === 'register') {
						if (isAuthenticated) {
							$state.go('dashboard');
						}
					} else if (!isAuthenticated) {
						$state.go('login');
					}
				});
		}

		function createAccount(account, callback) {
			var cb = callback || angular.noop;

			return Account.register(account,
				function () {
					return cb(account);
				},
				function (err) {
					this.logout();
					return cb(err);
				}.bind(this)).$promise;
		}

		function updateAccount(account, callback) {
			var cb = callback || angular.noop;

			return Account.save(account,
				function () {
					return cb(account);
				},
				function (err) {
					return cb(err);
				}.bind(this)).$promise;
		}

		function activateAccount(key, callback) {
			var cb = callback || angular.noop;

			return Activate.get(key,
				function (response) {
					return cb(response);
				},
				function (err) {
					return cb(err);
				}.bind(this)).$promise;
		}

		function changePassword(newPassword, callback) {
			var cb = callback || angular.noop;

			return Account.changePassword(newPassword, function () {
				return cb();
			}, function (err) {
				return cb(err);
			}).$promise;
		}

		function resetPasswordInit(mail, callback) {
			var cb = callback || angular.noop;

			return Account.passwordResetInit(mail, function() {
				return cb();
			}, function (err) {
				return cb(err);
			}).$promise;
		}

		function resetPasswordFinish(keyAndPassword, callback) {
			var cb = callback || angular.noop;

			return Account.passwordResetFinish(keyAndPassword, function () {
				return cb();
			}, function (err) {
				return cb(err);
			}).$promise;
		}
	}

})();
