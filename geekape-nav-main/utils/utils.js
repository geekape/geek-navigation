export function throttle(fn, delay) {
  var previous = 0;
  // 使用闭包返回一个函数并且用到闭包函数外面的变量previous
  return function() {
    var _this = this;
    var args = arguments;
    var now = new Date();
    if(now - previous > delay) {
      fn.apply(_this, args);
      previous = now;
    }
  }
}

export function isMobileSize() {
  const width = window.innerWidth || document.body.clientWidth
  return width < 568
}

export function titleCase(str) {
  const newStr = str.slice(0,1).toUpperCase() +str.slice(1).toLowerCase();
  return newStr;
}
