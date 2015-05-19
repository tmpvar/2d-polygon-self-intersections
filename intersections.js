var isect = require('exact-segment-intersect');
var float = require('robust-estimate-float');

module.exports = selfIntersections;

function cmp(a, b) {
  return a[0] === b[0] && a[1] === b[1];
}

function valid(a) {
  if (a[2][0] === 0) {
    return false
  }

  return true;
}

function selfIntersections(poly) {
  var seen = {};
  var l = poly.length;
  var isects = [];
  for (var o=0; o<l; o++) {
    var oc = poly[o]
    var on = poly[(o+1) % l];
    for (var p=0; p<l; p++) {
      var pc = poly[p]
      var pn = poly[(p+1) % l];
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
      r[1] = float(r[0]) / w;
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
