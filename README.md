# 2d-polygon-self-intersections

find self-intersections in a 2d polygon

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
// outputs: [ [ 5, 5 ] ]
```

### api

__isects__(`polygon`[, `filterFn`])

* `polygon` - an array of 2 component arrays (i.e. a triangle `[[0, 0], [10, 0], [10, 10]]`) or an array of objects: `[{x:0, y:0}, {x:10, y:0}, {x:10, y:10}]`
* `filterFn` - a filter function called whenever an intersection is found: `filterFn`(`isect`, `start0`, `end0`, `start1`, `end1`, `unique`)
 * `isect` - current intersection (e.g. `[5, 5]`) - mutations in this array get collected
 * `index0` - index of the segment (e.g `1`)
 * `start0` - start of the first segment (e.g `[0, 5]`)
 * `end0` - start of the first segment (e.g `[10, 5]`)
 * `index0` - index of the segment (e.g `3`)
 * `start1` - start of the first segment (e.g `[5, 0]`)
 * `end1` - start of the first segment (e.g `[5, 10]`)
 * `unique` - boolean representing whether or not this intersection point has been seen before
 * __return__ `true` to collect and `false` to discard

__returns__ an empty array if no interesections or an array of 2 component arrays representing the intersection points. 

_NOTE_: this library assumes the polygon is closed, so manually adding the start point as the end point has no effect.

Also note that there are 2 intersections per crossing, this library by default will only report one - all intersections will be unique.  This behavior can be changed with the `filterFn`.

## license

[MIT](LICENSE.txt)
