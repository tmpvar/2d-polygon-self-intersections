# 2d-polygon-self-intersections

This library may not be fast, but it is robust. Robust in the fact that it will find all of the self-intersections in a polygon - minus of course shared endpoints.

You can expect a time complexity of O(n^2)

Why wouldn't we use [Bentley–Ottmann](http://en.wikipedia.org/wiki/Bentley%E2%80%93Ottmann_algorithm)?  We may in the future, but that is going to take some time and having a functional mechanism for detecting self-intersections is far superior to a non-existant one. The api won't have to change for this to happen.

## install

`npm install 2d-polygon-self-intersections`

## use

```javascript
var isects = require('2d-polygon-self-intersections');

var poly = [
  [0, 0],
  [10, 0],
  [0, 10],
  [10, 10]
];

var r = isects(poly);
console.log(r);
// outputs: [ [ 5, 0 ] ]
```

### api

__isects__(`polygon`)

* `polygon` - an array of 2 component arrays (i.e. a triangle `[[0, 0], [10, 0], [10, 10]]`)

__returns__ an empty array if no interesections or an array of 2 component arrays representing the intersection points. 

_NOTE_: this library assumes the polygon is closed, so manually adding the start point as the end point has no effect.

Also note that there are 2 intersections per crossing, this library will only report one.  All intersections will be unique.

## license

[MIT](LICENSE.txt)
