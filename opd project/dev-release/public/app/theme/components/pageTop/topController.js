(function () {
    'use strict';

    angular.module('BlurAdmin.theme.components')
        .controller('topController',  topCtrl);

    /** @ngInject */
    function topCtrl($scope, $stateParams,DashboardService,$state) {
            $scope.ids="Dengue";
    }
})();
