/**
 * Created by greshan on 6/30/2017.
 */
angular.module('BlurAdmin.OPD').factory('QueueService', ['$http',
    function ($http) {
        return {
            peek: patient => $http.get('/queue?peek=true').then(response => response.data),
            enqueue:(name,hin,id)=>$http.put('/queue?name='+name+'&hin='+hin+'&id='+id).then(response => response.data),
            dequeue:()=>$http.get('/queue').then(response => response.data)
        };
    }]);