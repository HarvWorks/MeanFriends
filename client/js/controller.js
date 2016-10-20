////////////////////////////////////////////////////////////
//                   Global Varibles                     //
////////////////////////////////////////////////////////////

var success;

////////////////////////////////////////////////////////////
//                   Index controller                     //
////////////////////////////////////////////////////////////

app.controller('indexController', ['$scope', 'factory', '$location', function($scope, factory, $location) {
    $scope.sucess = success;
    success = "";
    var usersIndex = function() {
        factory.index(function callback(data) {
            $scope.friends = data;
        });
    };
    var user = function(id) {
        factory.show(id, function callback(data) {
            $scope.sucess = data.name + " has been removed!";
        });
    };
    $scope.delete = function(id) {
        user(id);
        factory.delete(id, function callback(data) {
            if(data == "Error"){
                $scope.sucess = "Please try removing again at a later time...";
            }
            usersIndex();
        });
    };
    usersIndex();
}]);

////////////////////////////////////////////////////////////
//                    New controller                      //
////////////////////////////////////////////////////////////

app.controller('newController', ['$scope', 'factory', '$location', function($scope, factory, $location) {
    $scope.input = {};
    $scope.addUser = function(){
        $scope.error = {};
        var error = 0;
        if(!$scope.input.name){
            $scope.error.name = "Please enter a name";
            error ++;
        }
        if(!$scope.input.birthday){
            $scope.error.birthday = "Please enter a birthday";
            error ++;
        }
        else if (Date.parse($scope.input.birthday) >= Date.now()) {
            $scope.error.birthday = "Please enter a valid birthday";
            error ++;
        }
        if (error === 0) {
            factory.create($scope.input, function callback(){
                success = $scope.input.name + " has been created!";
                $location.url('/index');
            });
        }
    };
}]);

////////////////////////////////////////////////////////////
//                   Edit controller                      //
////////////////////////////////////////////////////////////

app.controller('editController', ['$scope', 'factory', '$location', '$routeParams', function($scope, factory, $location, rParams) {
    $scope.user = {};
    $scope.input = {};
    this.controlValue = "Current Name:";
    var user = function() {
        factory.show(rParams.id, function callback(data) {
            $scope.user = data;
            $scope.input.name = data.name;
            $scope.input.birthday = data.birthday;
        });
    };

    $scope.updateUser = function(){
        $scope.error = {};
        var error = 0;
        if(!$scope.input.name){
            $scope.error.name = "Please enter a name";
            error ++;
        }
        if(!$scope.input.birthday){
            $scope.error.birthday = "Please enter a birthday";
            error ++;
        }
        else if (Date.parse($scope.input.birthday) >= Date.now()) {
            $scope.error.birthday = "Please enter a valid birthday";
            error ++;
        }
        if (error === 0) {
            factory.update($scope.input, rParams.id, function callback(data){
                $location.url('/index');
                success = data.name + " has been updated!";
            });
        }
    };
    user();
}]);

////////////////////////////////////////////////////////////
//                   Show controller                      //
////////////////////////////////////////////////////////////

app.controller('showController', ['$scope', 'factory', '$location', '$routeParams', function($scope, factory, $location, rParams) {
    var user = function() {
        factory.show(rParams.id, function callback(data) {
            $scope.user = data;
        });
    };
    user();
}]);
