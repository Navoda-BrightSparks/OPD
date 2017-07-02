/**
 * Created by greshan on 5/21/2017.
 */
(function () {
    'use strict';
    angular.module('OPD.pDashboard', ['ui.router','OPD.search'])
        .config(routeConfig);
    function routeConfig($stateProvider) {
        $stateProvider
            .state('pDashboard', {
                url: '/pdashboard/:hin',
                templateUrl : 'app/pages/pDashboard/pDashboard.html',
                controller:'pDashboardController',
                title: 'Patient Dashboard',
            });
    }

})();
