typeahead.demo
==============

This demo shows how to use angular.js typeahead directive from npm. Interactive version is [available here](http://anvaka.github.io/typeahead.demo/).

## Steps to make this work

Install directive from npm:

``` 
npm i typeahead.an
```

Require npm direcives, before bootstraping your main angular app:

``` js
require('typeahead.an');

var ngApp = angular.module('MyModule', []);
require('an').flush(ngApp);

// Finally bootstrap it:
angular.bootstrap(document, [ngApp.name]);
```

Now your directive is ready to be used inside html:

``` html
<input type="text"
      ng-model="addressModel"
      typeahead="address for address in getLocation($viewValue) | filter:$viewValue"
      typeahead-loading="loadingLocations">
```

Please read more here: [anvaka/an](https://github.com/anvaka/an)
