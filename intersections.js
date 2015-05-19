var isect = require('exact-segment-intersect');
var float = require('robust-estimate-float');

module.exports = selfIntersections;

function cmp(a, b) {
  return a[0] === b[0] && a[1] === b[1];
}

var pc = [0, 0];
var pn = [0, 0];
var oc = [0, 0];
var on = [0, 0];

function arrayOrObject(v, ret) {
  if (Array.isArray(v)) {
    ret[0] = v[0];
    ret[1] = v[1];
  } else {
    ret[0] = v.x;
    ret[1] = v.y;
  }
}

function selfIntersections(poly) {
  var seen = {};
  var l = poly.length;
  var isects = [];
  for (var o=0; o<l; o++) {
    arrayOrObject(poly[o], oc);
    arrayOrObject(poly[(o+1) % l], on);
    for (var p=0; p<l; p++) {
      arrayOrObject(poly[p], pc);
      arrayOrObject(poly[(p+1) % l], pn);

      if (cmp(pc, oc) || cmp(pc, on) || cmp(pn, oc) || cmp(pn, on)) {
        continue;
      }

      var r = isect(oc, on, pc, pn);
      // since these are homogeneous vectors, if the last component `w` is 0
      // then we've done something wrong
      var wraw = r[2];
      if (wraw.length === 1 && !wraw[0]) {
        continue;
      }

      var w = float(r[2]);
      r[0] = float(r[0]) / w;
      r[1] = float(r[1]) / w;
      r.pop();

      var key = r+'';
      if (!seen[key]) {
        seen[key] = true;
        isects.push(r);
      }
    }
  }

  return isects;
}
