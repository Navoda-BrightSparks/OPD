(function () {
    'use strict';
    angular.module('OPD.search', ['ngRoute'])
    .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('Search', {
                url: '/search',
                templateUrl: 'app/pages/search/search.html',
                controller:'SearchController',
                title: 'Search Patient',
                sidebarMeta: {
                    icon: 'ion-search',
                    order: 6,
                },
            });
    }
})();
