/**
 * Created by greshan on 6/30/2017.
 */
(function () {
    'use strict';
    angular.module('OPD.queue')
        .controller('QueueController',  QueueCtrl);
    /** @ngInject */
    function QueueCtrl($scope, $location,QueueService,$state) {
            QueueService.peek().then(info => {
                if(!info.id){
                    alert("no patients");
                    $state.go('Search');
                    return;
                }
                $scope.patient=info;
            });
        $scope.visit=()=>{
            QueueService.dequeue().then(result=>{
                if(result.id===$scope.patient.id) {
                    $location.path('/visits/' + $scope.patient.id);
                }else{
                    $state.go('queue');
                }

            });

        }
    }

})();
