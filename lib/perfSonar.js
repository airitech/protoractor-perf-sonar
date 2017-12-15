/**
 * プロトラクター用の性能計測ソナー
 * @param {*} protoractorBrowser browser object
 */
var PerfSonar = function (protoractorBrowser, config) {
  var _config = config ? config : {};
  var _browser = protoractorBrowser;
  var _selector = null;
  var _timeout = _config.timeout ? _config.timeout : 3000;
  var _intervalTime = _config.intervalTime ? _config.intervalTime : 50;
  var _measureType = '';
  /**
   * 対象のタグが非表示になったタイミングまでの性能を計測する。
   * @param selector タグのセレクタ
   */
  this.untilHide = function (selector) {
    _measureType = 'hide';
    _selector = selector;
    var script = '' +
      'window.startTime = performance.now();' +
      this._isVisibleFunc(selector) +
      'function checkHide(){' +
      '  var isVisible = isVisble();' +
      '  if (window.beforeVisible == true) {' +
      '    if (isVisible == false) {' +
      '      window.endTime = performance.now();' +
      '      window.clearInterval(window.perfInterval);' +
      '    }' +
      '  }' +
      '  window.beforeVisible = isVisible;' +
      '};' +
      'window.perfInterval = window.setInterval(checkHide, ' + _intervalTime + ');' +
      'checkHide();';
    _browser.executeScript(script);
  }
  /**
   * 対象のタグが表示になったタイミングまでの性能を計測する。
   * @param selector タグのセレクタ
   */
  this.untilShow = function (selector) {
    _measureType = 'show';
    _selector = selector;
    var script = '' +
      'window.startTime = performance.now();' +
      this._isVisibleFunc(selector) +
      'function checkShow(){' +
      '  var isVisible = isVisble();' +
      '  if (window.beforeVisible == false) {' +
      '    if (isVisible == true) {' +
      '      window.endTime = performance.now();' +
      '      window.clearInterval(window.perfInterval);' +
      '    }' +
      '  }' +
      '  window.beforeVisible = isVisible;' +
      '};' +
      'window.perfInterval = window.setInterval(checkShow, ' + _intervalTime + ');' +
      'checkShow();';
    _browser.executeScript(script);
  }
  this._isVisibleFunc = function (selector) {
    var script = '' +
      'function isVisble() {' +
      '  var element = document.querySelectorAll("' + selector + '");' +
      '  if (element == null || element.length == 0) {' +
      '    return false;' +
      '  }' +
      '  var style = window.getComputedStyle(element[0]);' +
      '  return style.display !== "none";' +
      '}';
    return script;
  }
  /**
   * 表示、非表示それぞれに対し、待ち時間ののちに、
   * 計測結果を取得する。
   */
  this.end = function () {
    if (_measureType == "show") {
      _browser.wait(function () {
        return element.all(by.css(_selector)).then(function (objects) {
          return (objects.length >= 1);
        });
      }, _timeout);
    } else {
      _browser.wait(function () {
        return element.all(by.css(_selector)).then(function (objects) {
          return (objects.length == 0);
        });
      }, _timeout);
    }
    browser.sleep(500);
    var script = '' +
      'var time = window.endTime - window.startTime;' +
      'window.endTime = null;' +
      'window.startTime = null;' +
      'return time;';
    return _browser.executeScript(script);
  };
};
module.exports = PerfSonar;
