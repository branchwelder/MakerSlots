// var onSuccess = function(data, status) {
//   window.location = "/forum";
// };
//
// var onError = function(data, status) {
//   console.log("status", status);
//   console.log("error", data);
// };
//
// $("#forumpost").submit(function(event) {
//   event.preventDefault();
//
//   var user = $("#forumpost").find("[name='username']").val();
//   var content = $("#forumpost").find("[name='content']").val();
//   var title = $("#forumpost").find("[name='title']").val();
//
//   $.post("login", {
//     user: user,
//     content: content,
//     title: title
//   })
//     .done(onSuccess)
//     .error(onError);
// });

var forummodule = angular.module('forummodule', []);


function mainController($scope, $http) {
    $scope.formData = {};

    // show the todos
    $http.get('/forum')
        .success(function(data) {
            $scope.posts = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // on form submit create new todo and updata data
    $scope.createPost = function() {
        $http.post('/newPost', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo when clicking on delete
    $scope.deleteTodo = function(id) {
        $http.delete('/delete/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };


    // edit a todo
    $scope.editTodo = function(id) {
      var edit = prompt("Edit this todo:");
        $http.post('/edit/' + id, {edit: edit})
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // mark todo as done
    $scope.doneTodo = function(id) {
      //console.log()
        $http.post('/done/' + id, {done: true})
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}
