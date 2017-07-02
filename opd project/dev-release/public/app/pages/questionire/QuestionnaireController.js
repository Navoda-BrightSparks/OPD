

angular.module('OPD.questionire').controller('QuestionController', ['$location','$scope', '$stateParams', 'PatientService',
    function ($location,$scope, $stateParams,PatientService) {



        $scope.questionID="";
        $scope.related = ["OPD", "Clinic"];
        $scope.answers=["Text","Number","Date"]
        $scope.questions=[];
        $scope.addQuestions=function () {
            $scope.questions.push({'questionText':$scope.text,'answerType':$scope.answer});
$scope.selectedAll=false;
        }
        $scope.remove = function(){
            var newDataList=[];
            $scope.selectedAll = false;
            angular.forEach($scope.questions, function(selected){
                if(!selected.selected){
                    newDataList.push(selected);
                }
            });
            $scope.questions = newDataList;
        };
        $scope.checkAll = function () {
            if (!$scope.selectedAll) {
                $scope.selectedAll = true;
            } else {
                $scope.selectedAll = false;
            }
            angular.forEach($scope.questions, function(x) {
                x.selected = $scope.selectedAll;
            });
        };
        $scope.addQuestion = (question) => {

            PatientService.addQuestion(question).then((reply) => {
                $scope.questionID=reply._id;
                console.log($scope.questionID);
            });
        };

        $scope.submitQuestions = () => {
            var newDataList=[];
           PatientService.submitQuestions($scope.questionID,$scope.questions).then((reply) => {
               if(reply==200){
                   $scope.questions = newDataList;
                   alert("Success");
               }
           });
        };
    }]);