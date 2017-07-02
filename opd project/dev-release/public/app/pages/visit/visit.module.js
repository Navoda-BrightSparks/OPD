// * Created by greshan on 5/18/2017.
(function () {
    'use strict';

    angular.module('OPD.visit', ['ui.router','ngRoute'])
        .config(routeConfig);

    /** @ngInject */
   function routeConfig($stateProvider) {
        $stateProvider
            .state('patient_visit', {
                url: '/visits/:id',
                templateUrl: 'app/pages/visit/visit.html',
                controller:'VisitsController',
                title:'Create Visit'
            });
    }
})();

