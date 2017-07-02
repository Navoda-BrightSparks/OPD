'use strict';

angular.module('BlurAdmin.OPD').factory('PatientService', ['$http',
    function ($http) {
        return {
            get: () => $http.get('/patients').then(response => response.data),
            getById: id => $http.get('/patients/' + id).then(response => response.data),
            addVisit: (id, visit) => $http.post('/patients/' + id + '/visits', visit).then(response => response.data),
            getByhin:hin => $http.get('/patients?hin=' + hin).then(response => response.data),
            getBynic:nic => $http.get('/patients?nic=' + nic).then(response => response.data),
            getLast50:()=> $http.get('/patients?criteria=last50').then(response =>response.data),
            addExamination:(id,exam)=>$http.put('/patients/examination/'+id,exam).then(response=>response.status),
            getAlergy:id=>$http.get('/patients/Alergies/'+id).then(response=>response.data),
            addAlergy:(id,alergy)=>$http.post('/patients/'+id+'/alergies',alergy).then(response=>response.data),
            updateAlergy:(id,alergy)=>$http.put('/patients/alergies/'+id,alergy).then(response=>response.data),
            deleteAlergy:(id)=>$http.delete('/patients/Alergies/'+id).then(response=>response.data),
            getVisitById:visitid => $http.get('/patients?visitid=' + visitid).then(response => response.data),
            addInjection:(id,injection)=>$http.put('/patients/injections/'+id,injection).then(response=>response.status),
            addTreatment:(id,treatment)=>$http.put('/patients/treatments/'+id,treatment).then(response=>response.status),
            addLaborder:(id,lab)=>$http.put('/patients/labOrder/'+id,lab).then(response=>response.status),
            notify: (id,data) => $http.put('/notify/'+id, data).then(response => response.data),
            addprescription:(id,prescription)=>$http.put('/patients/prescription/'+id,prescription).then(response=>response.status),
            getdrugs:(name)=>$http.get('https://rxnav.nlm.nih.gov/REST/Prescribe/drugs.json?name='+name).then(response=>response),
            addQuestion: question => $http.post('/patients/questionnaire', question).then(response => response.data),
            submitQuestions:(id,questions)=>$http.put('/patients/questionnaire/'+id,questions).then(response=>response.status),
        };
    }]);