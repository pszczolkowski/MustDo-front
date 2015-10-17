(function () {
	'use strict';

	angular
		.module('mustDoApp')
		.controller('BoardController', BoardController);

	BoardController.$inject = [
		'$scope',
		'board'];

	function BoardController($scope, board) {
		$scope.board = board;
	}
})();
