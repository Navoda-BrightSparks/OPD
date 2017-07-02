/**
 * Created by greshan on 6/30/2017.
 */
(function () {
    'use strict';

    angular.module('OPD.channel', ['ngRoute'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('patient_channel', {
                url: '/channel/:id',
                templateUrl: 'app/pages/visit/channel/opd.patients.html',
                controller:'ChannelController',
                title:'Channel Details'
            });
    }
})();