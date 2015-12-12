(function () {
	'use strict';

	angular
		.module('mustDoApp')
		.controller('TaskDetailsController', TaskDetailsController);

	TaskDetailsController.$inject = [
		'$scope',
		'$modalInstance',
		'$window',
		'config',
		'File',
		'toaster',
		'Comment',
		'Task',
		'Upload',
		'task',
		'team',
		'callback'];

	function TaskDetailsController($scope, $modalInstance, $window, config, File, toaster, Comment, Task, Upload, task, team, callback) {
		$scope.title = task.title;
		$scope.team = team;
				$scope.assignedTo = task.assignedTo;
		$scope.commentText = '';
		$scope.save = save;
		$scope.remove = remove;
		$scope.addComment = addComment;
		$scope.assign = assign;
		$scope.uploadFile = uploadFile;
		$scope.downloadFile = downloadFile;
		$scope.deleteFile = deleteFile;

		loadComments();
		reloadAttachements();


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

		function reloadAttachements() {
			$scope.files = Task.files({
				taskId: task.id
			});
		}

		function handleUploadFailure() {
			toaster.pop('error', 'Some error occurred');
		}

		function uploadFile(file) {
			Upload.upload({
				url: config.apiUrl + '/file/upload',
				data: {
					file: file,
					data: new Blob([angular.toJson({
						taskId: task.id
					})], {type: 'application/json'})
				}
			}).then(reloadAttachements, handleUploadFailure);
		}

		function downloadFile(file) {
			$window.location.href = config.apiUrl + '/file/' + file.fileId;
		}

		function deleteFile(file) {
			File.delete({
				fileId: file.fileId
			}).$promise.then(function () {
					toaster.pop('success', 'Attachement deleted');
					reloadAttachements();
				}, function () {
					toaster.pop('error', 'Some error occured');
				});
		}
	}
})();
