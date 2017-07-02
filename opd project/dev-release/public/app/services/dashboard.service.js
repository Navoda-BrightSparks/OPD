/**
 * Created by greshan on 5/9/2017.
 */
'use strict';

angular.module('BlurAdmin.OPD').factory('DashboardService', ['$http',
    function ($http) {
        return {
            getAllById:hin => $http.get('/dashboard?info=' + hin).then(response => response.data),
            getBPNodes:(id) => $http.get('/dashboard?bp=' + id).then(response => response.data),
            getRecentVisit:hin => $http.get('/dashboard?preVisit=' + hin).then(response => response.data),
        };
    }]);