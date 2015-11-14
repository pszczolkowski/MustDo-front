(function () {
	'use strict';

	angular
		.module('mustDoApp')
		.config(BoardRouteProvider);

	BoardRouteProvider.$inject = ['$stateProvider'];

	function BoardRouteProvider($stateProvider) {
		var resolveSingleBoard = ['$stateParams', 'Board', loadSingleBoard];
		var resolveLists = ['$stateParams', 'List', loadLists];

		$stateProvider.state('board', {
			parent: 'root',
			url: '/board/{boardId}/{boardName}',
			controller: 'BoardController',
			views: {
				'': {
					templateUrl: 'views/board/board.html',
					controller: 'BoardController',
				},
				'fragment': {
					templateUrl: 'views/board/navbar-fragment.html',
					controller: 'BoardNavbarFragmentController'
				}
			},
			resolve: {
				board: resolveSingleBoard,
				lists: resolveLists
			}
		});


		function loadSingleBoard($stateParams, Board) {
			return Board.get({
				boardId: $stateParams.boardId
			}).$promise;
		}

		function loadLists($stateParams, List) {
			return List.query({
				boardId: $stateParams.boardId
			}).$promise;
		}
	}
})();
