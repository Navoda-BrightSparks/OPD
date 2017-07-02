/**
 * Created by greshan on 5/21/2017.
 */
"use strict";

angular.module('OPD.search').controller('SearchController', ['$location','$scope','$rootScope','$routeParams', 'nurseService','PatientService','QueueService','$uibModal',
    function ($location,$scope,$rootScope, $routeParams, nurseService,PatientService,QueueService,$uibModal) {
        $scope.last50=true;
        $scope.getAll=()=>{
            PatientService.get().then(patient=>{
                $scope.patients=patient;
            })
        };
        $scope.Search=(hin)=>{
            PatientService.getByhin(hin).then(patient=>{
                $scope.patients=patient;
            })
        };
        $scope.SearchNIC=(nic)=>{
            PatientService.getBynic(nic).then(patient=>{
                $scope.patients=patient;
            })
        };
        $scope.goDash=(hin)=>{
            $location.path("/pdashboard/"+hin);
        };
        $scope.newVisit=(id)=>{
            $location.path("/visits/"+id);

        };
        $scope.addAllergy=(id)=>{
            $location.path("/alergies/"+id);
        };
        if($scope.last50){
            PatientService.getLast50().then(patient=>{
                $scope.patients=patient;
            });
        }
        $scope.addToQueue=(x)=>{
            QueueService.enqueue(x.firstName,x.HIN,x._id).then(resp=>{
                if(resp.status===200){
                    console.log(resp);
                    $scope.opdNo=resp.opdNo;
                    $scope.open('app/pages/search/successModal.html');
                }
            });
        };

        $scope.open = function (page, size) {
            $rootScope.modalInstance =$uibModal.open({
                animation: true,
                templateUrl: page,
                controller: 'SearchController',
                scope: $scope,
                size: size,
                resolve: {
                    items:()=> {
                        return $scope.items;
                    }
                }
            });
        };
        $scope.close=()=>{
            $scope.opdNo="";
            $rootScope.modalInstance.close('a');
        }
    }]);
