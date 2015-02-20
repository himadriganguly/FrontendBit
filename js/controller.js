var app = angular.module("MyApp", ['ui.bootstrap']);

app.controller("EventsCtrl", function($scope, $http, $modal, $log) {
	$http.defaults.headers.common["X-Custom-Header"] = "Angular.js";
	$http.get('data/events.json').
	success(function(data, status, headers, config) {
		$scope.valinaevents = data;
	});
	
	$scope.open = function (_valinaevent) {
	
	    var modalInstance = $modal.open({
	      templateUrl: 'myEventContent.html',
	      controller: 'EventInstanceCtrl',
	      resolve: {
	       valinaevent: function()
	       {
	       	return _valinaevent;
	       }
	      }
	    });
	  };
});

app.controller('EventInstanceCtrl', function ($scope, $modalInstance, valinaevent) {

  // $scope.items = items;
  // $scope.selected = {
    // item: $scope.items[0]
  // };
  
  $scope.valinaevent = valinaevent;
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
  
});


app.directive('bootstrapSwitch', [
        function() {
            return {
                restrict: 'A',
                require: '?ngModel',
                link: function(scope, element, attrs, ngModel) {
                    element.bootstrapSwitch();
 
                    element.on('switchChange.bootstrapSwitch', function(event, state) {
                        if (ngModel) {
                            scope.$apply(function() {
                                ngModel.$setViewValue(state);
                            });
                        }
                    });
 
                    scope.$watch(attrs.ngModel, function(newValue, oldValue) {
                        if (newValue) {
                            element.bootstrapSwitch('state', true, true);
                        } else {
                            element.bootstrapSwitch('state', false, true);
                        }
                    });
                }
            };
        }        
    ]);