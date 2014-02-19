typeahead.demo
==============

This demo shows how to use angular.js typeahead directive from npm. Interactive version is [available here](http://anvaka.github.io/typeahead.demo/).

## Steps to make this work

Install directive from npm:

``` 
npm i typeahead.an
```

Require it before angular application bootstrap:

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

Please read more here: [anvaka/an](https://github.com/anvaka/an)
