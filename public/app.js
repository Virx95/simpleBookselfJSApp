'use strict';

angular.module('simpleBookshelfApp', ['ngResource', 'ngRoute'])
    .config(function ($routeProvider, $httpProvider) {
        $routeProvider.when('/sighting-list', {templateUrl: 'public/sightingList.html', controller: 'SightingCtrl'});
        $routeProvider.when('/sighting-details/:name', {templateUrl: 'public/sightingDetails.html', controller: 'SightingDetailsCtrl'});

        $routeProvider.when('/animal-list', {templateUrl: 'public/animalList.html', controller: 'AnimalCtrl'});
        $routeProvider.when('/add-animal', {templateUrl: 'public/addAnimal.html', controller: 'AnimalCtrl'});
        $routeProvider.when('/animal-details/:id', {
            templateUrl: 'public/animalDetails.html',
            controller: 'AnimalDetailsCtrl'
        });
        $routeProvider.otherwise({redirectTo: '/animal-list'});
    })
    .factory('AnimalsFactory', function ($resource) {
        return $resource('/animals', {}, {
            addAnimal: {method: 'POST'},
            listAnimals: {method: 'GET', isArray: true}
        })
    })
    .factory('AnimalFactory', function ($resource) {
        return $resource('/animal/:id', {}, {
            deleteAnimal: {method: 'DELETE', params: {id: '@id'}},
            animalDetails: {method: 'GET', params: {id: '@id'}},
            updateAnimal: {method: 'POST', params: {id: '@id'}}
        })
    })
    .factory('SightingsFactory', function ($resource) {
        return $resource('/sighting/:id', {}, {
            getAllSightings: {method: 'GET', isArray: true, params: {id: '@id'}}
        })
    })
    .factory('SightingFactory', function ($resource) {
        return $resource('/sighting', {}, {
            saveSighting: {method: 'POST'},
            getAllSightings: {method: 'GET', isArray: true}
        })
    })
    .factory('SightingListFactory', function ($resource) {
        return $resource('/sighting/all', {}, {
            getAllSightings: {method: 'POST', isArray: true}
        })
    })
    .controller('AnimalCtrl', ['$scope', 'AnimalFactory', 'AnimalsFactory', '$location',
        function ($scope, AnimalFactory, AnimalsFactory, $location) {
            $scope.addNewAnimal = function () {
                AnimalsFactory.addAnimal($scope.animal);
                $location.path('/animal-list');
            };

            $scope.deleteAnimal = function (animalId) {
                AnimalFactory.deleteAnimal({id: animalId});
                $scope.animals = AnimalsFactory.listAnimals();
            };

            $scope.animals = AnimalsFactory.listAnimals();

        }])
    .controller('AnimalDetailsCtrl', ['$scope', '$routeParams', 'AnimalFactory', 'SightingsFactory', 'SightingFactory',
        function ($scope, $routeParams, AnimalFactory, SightingsFactory, SightingFactory) {
            $scope.animal = AnimalFactory.animalDetails({id: $routeParams.id});

            $scope.getAllSightings = function () {
                $scope.sightings = SightingsFactory.getAllSightings({id: $routeParams.id});
            }
            $scope.getAllSightings();

            $scope.updateAnimal = function () {
                AnimalFactory.updateAnimal($scope.animal)
            }

            $scope.saveSighting = function () {
                $scope.sighting.time = $('#time').val()
                $scope.sighting.animal_id = $routeParams.id
                $scope.sighting = SightingFactory.saveSighting($scope.sighting)
                $scope.getAllSightings();
            }
        }])
    .controller('SightingCtrl', ['$scope', '$routeParams', 'AnimalFactory', 'SightingsFactory', 'SightingFactory',
        function ($scope, $routeParams, AnimalFactory, SightingsFactory, SightingFactory) {
		    $scope.sightings = SightingFactory.getAllSightings();
        }])
    .controller('SightingDetailsCtrl', ['$scope', '$routeParams', 'SightingListFactory',
        function ($scope, $routeParams, SightingListFactory) {
            $scope.sightings = SightingListFactory.getAllSightings({location: $routeParams.name});
        }]);
