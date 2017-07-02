'use strict';

angular.module('OPD.visit').controller('VisitsController', ['$location','$scope', '$stateParams','$rootScope','$uibModal', 'PatientService',
    function ($location,$scope, $stateParams, $rootScope,$uibModal,PatientService) {
        function setVisitEnv(){
            $scope.date = new Date();
            $scope.types = ["OPD", "Clinic"];
            $scope.addVisit = (id, visit) => {
                var d = new Date();
                var n = d.getTime();
                visit.vid=n;
                PatientService.addVisit(id, visit).then((patient) => {
                    console.log(patient);
                    $scope.patient = patient;
                    visit.complaint = '';
                    visit.visitType='';
                    visit.remarks='';
                    $location.path('/channel/'+patient._id);
                });
            };
        }

        function getPatient() {
            if($stateParams.id){
                console.log($stateParams.id);
                PatientService.getById($stateParams.id).then(patient => {
                    $scope.patient = patient;
                    setVisitEnv();
                });
            }else{
                $location.replace('/home');
            }
        }

        getPatient();

        $scope.AddAlergy = (id, al) => {
            PatientService.addAlergy(id, al).then((patient) => {
                console.log(al);
                $scope.patient = patient;
                al.alergy = '';
                al.remarks = '';
                getPatient();
            });

        };

        $scope.UpadateAlergy = (aid) => {
            PatientService.getAlergy(aid).then((alergy) => {
                $scope.al = alergy;
            });
        };
        $scope.EditAlergies = (aid, al) => {
            PatientService.updateAlergy(aid, al).then((alergy) => {
                console.log(al);
                al.alergy = '';
                al.remarks = '';
            });
            getPatient();
        };

        $scope.DeleteAlergy = (id) => {
            PatientService.deleteAlergy(id).then(() => {
                getPatient();
            });
        };

        $scope.notify = (id, npatient) => {
           npatient.pid=id;
            PatientService.notify(id, npatient).then(patient => {

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