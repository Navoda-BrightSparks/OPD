

angular.module('OPD.patient_registration').controller('PatientRegController', ['$location','$scope', '$routeParams', 'nurseService','PatientService',
    function ($location,$scope, $routeParams, nurseService,PatientService) {
        $scope.myDate = new Date();
        function getPatient() {

            PatientService.getById($routeParams.id).then(patient => {
                $scope.patient = patient;
            });
        }

        $scope.required = true;
        $scope.date = new Date();
        $scope.titles = ["Baby", "Miss","Mr","Mrs","Rev"];
        $scope.sex = ["Male","Female"];
        $scope.cstatus=["Married","single"];
        $scope.bloodGroup=["A+","A-","B+","B-","AB","O+","O-"];
        $scope.addPatient = (patient) => {
            $scope.required = true;
            var d = new Date();
            var n = d.getTime();
            patient.HIN=n;
            nurseService.addPatient(patient).then(() => {
                $location.url("/home/nurse/addtoQueue").replace();

            });
        };
    }]);