(function () {
	'use strict';

	angular
		.module('mustDoApp')
		.factory('Account', Account);

	Account.$inject = ['$resource', 'config'];

	function Account($resource, config) {
			return $resource(config.apiUrl + '/account', {}, {
				get: {
					method: 'GET',
					interceptor: {
						response: function(response) {
							// expose response
							return response;
						}
					}
				},
				changePassword: {
					url: config.apiUrl + '/account/change_password',
					method: 'POST'
				},
				passwordResetInit: {
					url: config.apiUrl + '/account/reset_password/init',
					method: 'POST'
				},
				passwordResetFinish: {
					url: config.apiUrl + '/account/reset_password/finish',
					method: 'POST'
				},
				register: {
					url: config.apiUrl + '/account/register',
					method: 'POST'
				}
			});
		}
})();
