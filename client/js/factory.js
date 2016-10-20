app.factory('factory', ['$http',function($http) {

    ////////////////////////////////////////////////////////////
    //                        Variables                       //
    ////////////////////////////////////////////////////////////

    var friends = [];
    var friend = {};

    ////////////////////////////////////////////////////////////
    //                        Factory                         //
    ////////////////////////////////////////////////////////////

    var factory = {};

    factory.index = function(callback) {
        $http.get('/friends').then(function(returnData){
            friends = returnData.data;
            if (typeof(callback) === 'function') {
                callback(returnData.data);
            }
        });
    };

    factory.create = function(newUser, callback) {
        if (typeof(newUser) === 'object') {
            $http.post('/friends', newUser).then(function(returnData){
                if (typeof(callback) == 'function'){
                    callback();
                }
            });
        }
    };

    factory.update = function(updateUser, id, callback) {
        if (typeof(updateUser) === 'object') {
            $http.put('/friends/' + id, updateUser).then(function(returnData){
                if (typeof(callback) === 'function') {
                    callback(returnData.data);
                }
            });
        }
    };

    factory.show = function(id, callback) {
        $http.get('friends/' + id).then(function(returndata){
            if (typeof(callback) === 'function') {
                returndata.data.birthday = new Date(returndata.data.birthday);
                friend = returndata.data;
                callback(returndata.data);
            }
        });
    };

    factory.delete = function(id, callback) {
        $http.delete('/friends/' + id).then(function(returnData){
            if (typeof(callback) === 'function') {
                callback(returnData.data);
            }
        });
    };

    return factory;

}]);
