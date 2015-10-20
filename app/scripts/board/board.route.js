(function () {
	'use strict';

	angular
		.module('mustDoApp')
		.config(BoardRouteProvider);

	BoardRouteProvider.$inject = ['$stateProvider'];

	function BoardRouteProvider($stateProvider) {
		var resolveSingleBoard = ['$stateParams', 'Board', loadSingleBoard];

		$stateProvider.state('board', {
			url: '/board/{boardId}/{boardName}',
			controller: 'BoardController',
			views: {
				'@': {
					templateUrl: 'views/board/board.html',
					controller: 'BoardController'
				},
				navbar: {
					templateUrl: 'views/board/navbar-fragment.html',
					controller: 'BoardNavbarFragmentController'
				}
			},
			resolve: {
				board: resolveSingleBoard
			}
		});


		function loadSingleBoard($stateParams, Board) {
			return Board.get({
				boardId: $stateParams.boardId
			}).$promise;
		}
	}
})();
