(function () {
	'use strict';

	angular
		.module('mustDoApp')
		.controller('TaskDetailsController', TaskDetailsController);

	TaskDetailsController.$inject = [
		'$scope',
		'$modalInstance',
		'toaster',
		'Comment',
		'Task',
		'task',
		'callback'];

	function TaskDetailsController($scope, $modalInstance, toaster, Comment, Task, task, callback) {
		$scope.title = task.title;
		$scope.commentText = '';
		$scope.save = save;
		$scope.remove = remove;
		$scope.addComment = addComment;

		loadComments();


		function save() {
			Task.update({
				id: task.id,
				title: $scope.title
			}).$promise
				.then(function () {
					toaster.pop('success', 'Task has been saved');
					callback();
				}, function () {
					toaster.pop('error', 'Some error occured');
				});
		}

		function remove() {
			Task.delete({taskId: task.id}).$promise
				.then(function () {
					toaster.pop('success', 'Task has been deleted');
					callback();
				}, function () {
					toaster.pop('error', 'Some error occured');
				});
		}

		function addComment() {
			if ($scope.commentText.length === 0) {
				return;
			}

			var comment = new Comment();
			comment.taskId = task.id;
			comment.text = $scope.commentText;

			comment.$save().then(function () {
				$scope.commentText = '';
				loadComments();
			});
		}

		function loadComments() {
			$scope.loadingComments = true;

			Comment.query({taskId: task.id}).$promise
				.then(function (comments) {
					$scope.comments = comments;
					$scope.loadingComments = false;
				});
		}
	}
})();
