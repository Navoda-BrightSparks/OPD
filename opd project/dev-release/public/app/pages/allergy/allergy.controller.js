"use strict";

angular.module('OPD.allergy').controller('AllergyController', ['$location','$scope', '$stateParams','PatientService',
    function ($location,$scope, $stateParams, PatientService) {
        function getPatient() {
            PatientService.getById($stateParams.id).then(patient => {
                $scope.patient = patient;
            });
        }
        getPatient();
        $scope.AddAlergy=(id,al)=>{
            PatientService.addAlergy(id,al).then((patient)=>{
                console.log(al);
                $scope.patient=patient;
                al.alergy='';
                al.remarks='';
                getPatient();
            });

        }
        $scope.UpadateAlergy=(aid)=>{
            PatientService.getAlergy(aid).then((alergy)=>{
                $scope.al=alergy;
            });

        }
        $scope.EditAlergies=(aid,al)=>{

            PatientService.updateAlergy(aid,al).then((alergy)=>{
                console.log(al);
                al.alergy='';
                al.remarks='';


            });
            getPatient();
        }
        $scope.DeleteAlergy=(id)=>{
            PatientService.deleteAlergy(id).then(()=>{
                getPatient();
            });
        };
    }]);

