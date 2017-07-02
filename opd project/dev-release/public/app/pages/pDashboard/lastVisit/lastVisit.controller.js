/**
 * Created by greshan on 6/30/2017.
 */
(function () {
    'use strict';
    angular.module('OPD.pDashboard')
        .controller('lastVisitController',  lastVisitCtrl);
    /** @ngInject */
    function lastVisitCtrl($scope, $stateParams,DashboardService,$state) {
        console.log($stateParams.hin);
        DashboardService.getRecentVisit($stateParams.hin).then(visit=>{
            $scope.lastVisit=visit[0].visit;
            console.log($scope.lastVisit);
        });
    }

})();