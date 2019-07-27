/**
 * Checks if two rectangles intersect
 * @param  {Object} {{x: number, y: number, width: number, height: number}} a rectangle
 * @param  {Object} {{x: number, y: number, width: number, height: number}} b rectangle
 * @return  {Boolean}
 */
export function checkIntersect(a, b) {
  var r1 = {
    left: a.x,
    top: a.y,
    right: a.x + a.width,
    bottom: a.y + a.height
  }
  var r2 = {
    left: b.x,
    top: b.y,
    right: b.x + b.width,
    bottom: b.y + b.height
  }

  return !(r2.left > r1.right ||
    r2.right < r1.left ||
    r2.top > r1.bottom ||
    r2.bottom < r1.top);
}

export function msRectToXYXWH(rect){
  return {
    x: rect.x(),
    y: rect.y(),
    width: rect.width(),
    height: rect.height(),
  }
}

/**
 * Checks if two rectangles intersect
 * @param  {Array} {{updatedAt: Date}} a
 * @return  {Object}
 */
export function getRecentObject(a){
var mostRecentDate = new Date(Math.max.apply(null, a.map( e => {
  var t = new Date(e.updatedAt)
  return t;
})));
var mostRecentObject = a.filter( e => {
  let d = e.updatedAt
   d = new Date(d);
  return d.getTime() == mostRecentDate.getTime();
})[0];
return mostRecentObject
}
