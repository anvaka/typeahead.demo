require('angular');
require('typeahead.an'); // we are going to use typeahead in this demo

require('an').controller(DemoCtrl);
require('an').run();

function DemoCtrl($scope, $http) {
  $scope.getLocationString = function(input) {
    return getAddress(input).then(mapToFormattedAddress);
  };

  $scope.getLocationObject = function(input) {
    return getAddress(input).then(mapToLocationObject);
  };
  $scope.formatAddress = function(modelOrString) {
    if (typeof modelOrString === 'string' || !modelOrString) {
      return "";
    }
    return modelOrString.label;
  };

  function getAddress(input) {
    return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: input,
        sensor: false
      }
    }).then(function (res) {
      return res.data.results.slice(0, 4);
    });
  }

  function mapToLocationObject(results) {
    var prefix = "https://maps.googleapis.com/maps/api/staticmap?size=400x120";

    return results.map(function(item) {
      var center = item.geometry.location;
      var mapUrl = prefix;
      mapUrl += '&center=' + center.lat + ',' + center.lng;
      mapUrl += '&markers=size:med|' + center.lat + ',' + center.lng;
      mapUrl += '&zoom=' + getBoundsZoomLevel(item.geometry.bounds, {
        width: 400,
        height: 120
      });

      return {
        label: item.formatted_address,
        mapUrl: mapUrl
      };
    });
  }

  function mapToFormattedAddress(results) {
    return results.map(function(item) {
      return item.formatted_address;
    });
  }
}

function getBoundsZoomLevel(bounds, mapDim) {
  var WORLD_DIM = {
    height: 256,
    width: 256
  };
  var ZOOM_MAX = 21;

  if (!bounds) {
    return 13;// something is wrong.
  }

  var ne = bounds.northeast;
  var sw = bounds.southwest;

  var latFraction = (latRad(ne.lat) - latRad(sw.lat)) / Math.PI;

  var lngDiff = ne.lng - sw.lng;
  var lngFraction = ((lngDiff < 0) ? (lngDiff + 360) : lngDiff) / 360;

  var latZoom = zoom(mapDim.height, WORLD_DIM.height, latFraction);
  var lngZoom = zoom(mapDim.width, WORLD_DIM.width, lngFraction);

  return Math.min(latZoom, lngZoom, ZOOM_MAX);

  function latRad(lat) {
    var sin = Math.sin(lat * Math.PI / 180);
    var radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
    return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
  }

  function zoom(mapPx, worldPx, fraction) {
    return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
  }

}
