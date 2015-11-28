(function () {
	'use strict';

	angular
		.module('mustDoApp')
		.factory('Team', Team);

	Team.$inject = ['$resource', 'config'];

	function Team($resource, config) {
		return $resource(config.apiUrl + '/team/:teamId', {}, {
			addMember: {
				url: config.apiUrl + '/team/:teamId/member',
				method: 'POST'
			},
			removeMember: {
				url: config.apiUrl + '/team/:teamId/member/:userId',
				method: 'DELETE'
			}
		});
	}
})();
