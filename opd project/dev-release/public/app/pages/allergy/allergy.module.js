(function () {
    'use strict';
    angular.module('OPD.allergy', ['ngRoute'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('Allergy', {
                url: '/alergies/:id',
                templateUrl: 'app/pages/allergy/alergy.patient.html',
                controller:'AllergyController',
                title: 'Add Allergy'
            });
    }
})();
