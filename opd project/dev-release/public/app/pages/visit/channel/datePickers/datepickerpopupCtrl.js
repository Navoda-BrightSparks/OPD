/**
 * Created by n.poltoratsky
 * on 23.06.2016.
 */
(function(){
    'use strict';

    angular.module('OPD.channel')
        .controller('datepickerpopupCtrl2', datepickerpopupCtrl2);

    /** @ngInject */
    function datepickerpopupCtrl2($scope) {

        $scope.open = open;
        $scope.opened = false;
        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = 'MM/dd/yyyy';
        $scope.options = {
            showWeeks: false
        };

        function open() {
            $scope.opened = true;
        }
    }
})();