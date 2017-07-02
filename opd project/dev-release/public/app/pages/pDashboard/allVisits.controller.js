
(function () {
    'use strict';
    angular.module('OPD.pDashboard')
        .controller('allVisitController',  allVisitCtrl);
    /** @ngInject */
    function allVisitCtrl($scope, $stateParams,DashboardService,PatientService) {
        console.log($stateParams.hin);
        PatientService.getByhin($stateParams.hin).then(patient => {
            console.log(patient[0].visits);
            $scope.allVisits = patient[0];
        });
    }

})();