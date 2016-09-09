angular.module('routes',['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl:'templates/choose-resource.html',
        controller:'ResourceController',
        resolve: {
          icons: function($http) {
              return $http.get("/resourceIcons").
                then(function(res) {
                  return res;
                }, function(res) {
                  alert('error finding images');
                });
          }
        }
      })
      .when('/subCategory/:service', {
        templateUrl:'templates/SelectSubCat.html',
        controller:'SubCatController'
      })
      .when('/findResources/:service', {
        templateUrl:'templates/HopeNet.html',
        controller:'ResultsController'
      })
      .otherwise({
        redirectTo: "/"
      })
  })
  .controller('ResourceController',function($scope, icons) {
    $scope.top_icons = [];
    $scope.bottom_icons = [];
    var num_icons = icons.data.length;
    for(var index = 0; index < num_icons; index++) {//create top and bottom row icons
      var name = icons.data[index];
      if(index < (num_icons / 2)) {
        $scope.top_icons.push({file_name: name, title: name.substring(0,name.length - 4)});
      } else {
        $scope.bottom_icons.push({file_name: name, title: name.substring(0,name.length - 4)});
      }
    }
  })
  .controller('SubCatController',function($scope,$routeParams,$window,$location) {
    $window.document.title = $routeParams.service;
    $scope.title = $routeParams.service;
    $scope.findResources = function() {
        var search_url = "/findResources/" + $routeParams.service;
        $location.path(search_url);
    };
  })
  .controller('ResultsController',function($scope,$routeParams,$location) {
    $scope.list_obs = {};
    $scope.list_obs['days'] = false;
    $scope.list_obs['populations'] = false;
    $scope.list_obs['hours'] = false;
    $scope.list_obs['languages'] = false;
    $scope.toggleExpand = function(category) {
      $scope.list_obs[category] = !$scope.list_obs[category];
    };
    $scope.isExpanded = function(category) {
      return $scope.list_obs[category];
    };
  })
  .directive('resourceHeader',function() {
    return {
      restrict:'E',
      templateUrl:'templates/resources/resource-header.html',
      controller:function($scope) {
        var in_focus = false;
        $scope.toggleFocus = function() {
          in_focus =  !in_focus;
        };
        $scope.isFocused = function() {
          return in_focus;
        };
      }
    };
  });
