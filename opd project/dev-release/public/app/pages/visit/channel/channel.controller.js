'use strict';

angular.module('OPD.channel').controller('ChannelController', ['$location','$scope','$stateParams', 'PatientService','toastr',
    function ($location,$scope,$stateParams, PatientService,toastr) {
       $scope.treatments=["dressing","shortwave diathermy","hot wax bath to hands","eye exercies","collect laboratory sample","extraction","medication","baby feeding advice"];
        $scope.injections=["BCG 1 dose"];
        $scope.laborders=["sam","fasting blood sugar","Random blood sugar","PPBS","Blood sugs","Urine Full report","Urine Sugar","PT-INR","Reticulocyte count","CSF full report","Aspiration fluid full report","Dengue IgG-IgM Ab"]
       $scope.priority=["high","medium","low"];
       $scope.frequencies=["B.i.d","tbd","tbdt"];
       $scope.lab=[];
        $scope.parseFloat = function(value){
            return parseFloat(value);
        };
        function getvisit() {
            PatientService.getVisitById($stateParams.id).then(visit => {
                $scope.vvisit = visit;
                console.log($scope.vvisit);
            });
        }
        function displayToast(message,title,type) {
            toastr.success(title, message, {
                "autoDismiss": true,
                "positionClass": "toast-top-full-width",
                "type": type,
                "timeOut": "3000",
                "extendedTimeOut": "500",
                "allowHtml": false,
                "closeButton": false,
                "tapToDismiss": true,
                "progressBar": false,
                "newestOnTop": true,
                "maxOpened": "3",
                "preventDuplicates": false,
                "preventOpenDuplicates": false
            })

        }
        getvisit();
        $scope.addExamination=(id,Examination)=>{
            PatientService.addExamination(id,Examination).then(reply=>{
                console.log(reply);
                if(reply==200){
                    displayToast('Success','Examinations saved successfully','success');
                }
            });
        };

        $scope.addInjection=(id,injection)=>{
            PatientService.addInjection(id,injection).then(reply=>{
                if(reply==200){
                    displayToast('Success','Injection saved successfully','success');
                }
            });
        };

        $scope.addTreatment=(id,treatment)=>{
            PatientService.addTreatment(id,treatment).then(reply=>{
                if(reply==200){
                    displayToast('Success','Treatment saved successfully','success');
                }
            });
        };
        $scope.addLaborder=(id,lab)=>{
            console.log(lab)
            PatientService.addLaborder(id,lab).then(reply=>{
                $scope.lab.push(lab);
                if(reply==200){
                    displayToast('Success','Lab Orders saved successfully','success');
                }
            });
        };

        $scope.prescription=[];
        $scope.getDrugs=function(name) {
            PatientService.getdrugs(name).then(response => {
                $scope.drugs=null;
                let data=response.data.drugGroup.conceptGroup;
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        console.log(data[key]);
                        if(data[key].conceptProperties){
                            $scope.drugs=data[key].conceptProperties;
                            break;
                        }
                    }
                }
                console.log($scope.drugs);
            })

        };
        $scope.remove = function(){
            var newDataList=[];
            $scope.selectedAll = false;
            angular.forEach($scope.prescription, function(selected){
                if(!selected.selected){
                    newDataList.push(selected);
                }
            });
            $scope.prescription = newDataList;
        };
        $scope.getname=function(name){
            $scope.mname=name;
        };
        $scope.addMedicine=function () {
            $scope.prescription.push({'drugname':$scope.mname,'frequency':$scope.l,'Period':$scope.g});
            $scope.mname="";
            $scope.g="";
            $scope.l="";
        }
        $scope.addprescription=(id,prescription)=>{
            var newDataList=[];
            PatientService.addprescription(id,prescription ).then(reply=>{
                if(reply==200){
                    $scope.prescription = newDataList;
                    alert("Success");
                }
            });
        };
        /*
        $scope.addMedicine=function () {
            console.log($scope.freq);
            $scope.prescription.push({'drugname':$scope.mname,'Period':$scope.period,'frequency':$scope.freq});
            console.log($scope.prescription);
        };
        $scope.addprescription=(id,prescription)=>{
            console.log($scope.prescription);
            var newDataList=[];
            PatientService.addprescription(id,prescription ).then(reply=>{
                if(reply===200){
                    $scope.prescription = newDataList;
                    displayToast('Success','Prescription saved successfully','success');
                }
            });
        };*/
        $scope.print=function () {
            printJS({printable: $scope.prescription, properties: ['drugname', 'frequency', 'Period'], type: 'json'})
        };
        $scope.printlab=function () {
            printJS({printable: $scope.lab, properties: ['testName', 'priority', 'comment','duedate'], type: 'json'})
        }
    }]);