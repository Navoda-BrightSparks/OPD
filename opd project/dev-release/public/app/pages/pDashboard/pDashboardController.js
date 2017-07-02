(function () {
    'use strict';

    angular.module('OPD.pDashboard')
        .controller('pDashboardController',  pDashboardCtrl);

    /** @ngInject */
    function pDashboardCtrl($scope, $stateParams,DashboardService,$state,$uibModal) {
        console.log($stateParams);
        function getAll() {
            DashboardService.getAllById($stateParams.hin).then(info => {
                if(!info._id){
                    $state.go('Search');
                    return;
                }
                $scope.patient=info;
                $scope.hasAllergies = info.Alergies.length === 0 ? false : true;
                console.log(info);
            });
        }
        getAll();
        $scope.calculateAge =(birthday) =>{ // birthday is a date
            let d = new Date(birthday);
            let ageDifMs = Date.now() - d.getTime();
            let ageDate = new Date(ageDifMs); // miliseconds from epoch
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        };
        $scope.open = function (page, size) {
            $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                resolve: {
                    patient: function () {
                        return $scope.patient;
                    }
                }
            });
        };
    }

})();
