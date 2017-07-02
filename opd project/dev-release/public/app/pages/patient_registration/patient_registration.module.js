// * Created by greshan on 5/18/2017.
(function () {
    'use strict';

    angular.module('OPD.patient_registration', ['ngRoute'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('patient_registration', {
                url: '/registration',
                templateUrl: 'app/pages/patient_registration/patient_registration.html',
                controller:'PatientRegController',
                title: 'patient registration',
                sidebarMeta: {
                    icon: 'ion-android-home',
                    order: 1,
                },
            });
    }

})();
