typeahead.demo
==============

This demo shows how to use angular.js typeahead directive from npm.

All I had to do is:

Install directive from npm:

``` 
npm i typeahead.an
```

Require it from my main controller:

``` js
require('typeahead.an');
```

Use it inside html:

``` html
<input type="text"
      ng-model="addressModel"
      typeahead="address for address in getLocation($viewValue) | filter:$viewValue"
      typeahead-loading="loadingLocations">
```
