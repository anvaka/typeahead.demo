require('typeahead.an'); // we are going to use typeahead in this demo

require('an').controller(DemoCtrl);
require('an').flush(); // flush and bootstrap angular app

function DemoCtrl($scope, $http) {
  $scope.getLocation = function(val) {
      return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: val,
          sensor: false
        }
      }).then(function(res){
        var addresses = [];
        angular.forEach(res.data.results, function(item){
          addresses.push(item.formatted_address);
        });
        return addresses;
      });
    };
}
