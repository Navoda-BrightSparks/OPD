(function () {
    'use strict';
    angular.module('OPD.questionire', ['ngRoute'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('questionire', {
                url: '/questionire',
                templateUrl: 'app/pages/questionire/questionnaire.html',
                controller:'QuestionController',
                title: 'Questionnaire',
                sidebarMeta: {
                    icon: 'ion-search',
                    order: 6,
                }
            });
    }
})();