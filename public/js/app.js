angular.module('routes',['ngRoute'])
  .config(function($routeProvider) {
    console.log('routeProvider is working');
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
      .otherwise({
        redirectTo: "/"
      })
  })
  .controller('ResourceController',function($location,$scope, icons) {
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
  .controller('SubCatController',function($scope,$routeParams,$window) {
    $window.document.title = $routeParams.service;
    $scope.title = $routeParams.service;
  })
  .directive('resourceHeader',function() {
    return {
      restrict:'E',
      templateUrl:'templates/resources/resource-header.html',
      controller:function($scope) {
        var in_focus = false;
        $scope.toggleFocus = function() {
          in_focus ^= true;
        };
        $scope.isFocused = function() {
          return in_focus? "block":"none";
        };
      }
    };
  });
