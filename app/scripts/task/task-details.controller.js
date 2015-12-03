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
		'team',
		'callback'];

	function TaskDetailsController($scope, $modalInstance, toaster, Comment, Task, task, team, callback) {
		$scope.title = task.title;
		$scope.team = team;
		$scope.assignedTo = task.assignedTo;
		$scope.commentText = '';
		$scope.save = save;
		$scope.remove = remove;
		$scope.addComment = addComment;
		$scope.assign = assign;

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
				toaster.pop('success', 'Comment has been added');
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

		function assign() {
			Task.assign({
				taskId: task.id,
				userId: $scope.assignedTo
			}).$promise.then(function () {
					toaster.pop('success', 'Task has been assigned');
					callback();
				}, function () {
					toaster.pop('error', 'Some error occurred');
				});
		}
	}
})();
