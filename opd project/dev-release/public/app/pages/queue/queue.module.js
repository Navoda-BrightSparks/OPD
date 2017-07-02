
(function () {
    'use strict';
    angular.module('OPD.queue', ['ui.router','ngRoute'])
        .config(routeConfig);
    function routeConfig($stateProvider) {
        $stateProvider
            .state('queue', {
                url: '/viewqueue',
                templateUrl : 'app/pages/queue/queue.html',
                controller:'QueueController',
                title: 'Patient Queue',
                sidebarMeta: {
                    icon: 'ion-home',
                    order: 3,
                },
            });
    }

})();
