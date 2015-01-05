'use strict';

// Declare app level module which depends on filters, and services
angular.module('App', []).controller('RegistrationCtrl', ['$scope', 'RegistrationFactory', function($scope, RegistrationFactory) {
    $scope.faculties = RegistrationFactory.getFaculty();
    $scope.englishLevels = RegistrationFactory.getEnglish();
    $scope.professions = RegistrationFactory.getProfession();
    $scope.registrationForm = {
        'male'          : '',
        'female'        : '',
        'firstName'     : '',
        'lastName'      : '',
        'age'           : '',
        'faculty'       : '',
        'english'       : '',
        'profession'    : '',
        'email'         : '',
        'skype'         : '',
        'motivation'    : ''
    };
    $scope.originalForm = angular.copy($scope.registrationForm);
    $scope.resetForm = function() {
        $scope.registrationForm = angular.copy($scope.originalForm);
        $scope.registrForm.$setPristine();
    };

    $scope.error = false;
    $scope.formSent = false;

    $scope.$watch('registrationForm', function() {
        $scope.url = 'https://docs.google.com/forms/d/1e253kg99TCkE1T4TKh-p3BHyTw9arSiC6jUNYsTiOzY/formResponse?embedded=true/'+
        'entry.2103445754='  + $scope.registrationForm.male +
        '&entry.2103445754=' + $scope.registrationForm.female +
        '&entry.1711097623=' + $scope.registrationForm.firstName +
        '&entry.1942650927=' + $scope.registrationForm.lastName +
        '&entry.1608813341=' + $scope.registrationForm.age +
        '&entry.1078273815=' + $scope.registrationForm.faculty +
        '&entry.338475600='  + $scope.registrationForm.english +
        '&entry.1562116250=' + $scope.registrationForm.profession +
        '&entry.1785890333=' + $scope.registrationForm.email +
        '&entry.1411195577=' + $scope.registrationForm.skype +
        '&entry.558284524='  + $scope.registrationForm.motivation;
    }, true);

    $scope.sendRequest = function(url) {
       RegistrationFactory.sendRequest(url).then(function(result) {
           $scope.error = false;
           $scope.formSent = true;
           $scope.resetForm();
        }, function(error) {
           $scope.error = false;     //TBD... CORS trigers error flow but request successfully sent
           $scope.formSent = true;
           $scope.resetForm();
        });
    };

}]).factory('RegistrationFactory', [ '$http', function($http) {
    return {
        'sendRequest': function(url) {
            return $http({
                method: 'GET',
                url: url,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }

            });
        },
        'getFaculty': function() {
            return [
                'Welding Faculty - FS',
                'Engineering and Physics Faculty - IFB',
                'Engineering and Chemistry Faculty - IHF',
                'Faculty of Biomedical Engineering - FBE',
                'Instrument Building Faculty - EBF',
                'Radio-Engineering Faculty - RTF',
                'Heat-and-Power Engineering Faculty - Teff',
                'Faculty of Aviation and Space Systems - FAX',
                'Faculty of Biotechnology and Bioengineering - FBT',
                'Faculty of Electric Power Engineering and Automation - FEA',
                'Faculty of Electronics - FEL',
                'Faculty of Informatics and Computer Technology - FICT',
                'Faculty of Linguistics - FL',
                'Faculty of Management and Marketing - FMM',
                'Faculty of Sociology and Law - FAT',
                'Faculty of Applied Mathematics - FPM',
                'Physics and Mathematics Faculty - FMF',
                'Chemistry and Technology Faculty - HTF',
                'Other'
            ];
        },
        'getEnglish': function() {
            return [
                'Absent',
                'Pre-Intermediate',
                'Intermediate',
                'Advanced'
            ];
        },
        'getProfession': function() {
            return [
                'Front-End',
                'Back-End'
            ]
        }
    };
}]);

