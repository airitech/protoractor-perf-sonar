/**
 * プロトラクター用の性能計測ソナー
 * @param {*} protoractorBrowser browser object
 */
var PerfSonar = function (protoractorBrowser, config) {
  var _config = config ? config : {};
  var _browser = protoractorBrowser;
  var _selector = null;
  var _timeout = _config.timeout ? _config.timeout : 3000;
  /**
   * 対象のタグが非表示になったタイミングまでの性能を計測する。
   * @param selector タグのセレクタ
   */
  this.startHideTag = function (selector) {
    _selector = selector;
    var check = '($("' + selector + ':visible").length != 0)';
    var script = 'window.startTime = performance.now();function checkHide() {var isVisible = ' + check + ';if (window.beforeVisible == true) {if (isVisible == false) {window.endTime = performance.now();window.clearInterval(window.perfInterval);}}window.beforeVisible = isVisible;};window.perfInterval = window.setInterval(checkHide, ' + _intervalTime + ');checkHide();';
    _browser.executeScript(script);
  }
  /**
   * 対象のタグが表示になったタイミングまでの性能を計測する。
   * @param selector タグのセレクタ
   */
  this.startShowTag = function (selector) {
    _selector = selector;
    var check = '($("' + selector + ':visible").length != 0)';
    var script = 'window.startTime = performance.now();function checkShow(){var isVisible = ' + check + ';if (window.beforeVisible == false) {if (isVisible == true) {window.endTime = performance.now();window.clearInterval(window.perfInterval);}}window.beforeVisible = isVisible;}; window.perfInterval = window.setInterval(checkShow, ' + _intervalTime + '); checkShow();';
    _browser.executeScript(script);
  }
  /**
   * 処理終了を取得し、ファイルに書き出す。
   */
  this.end = function () {
    _browser.wait(function () {
      return element.all(by.css(_selector)).then(function (objects) {
        return (objects.length >= 1);
      });
    }, _timeout);
    return _browser.executeScript('return window.endTime - window.startTime;');
  };
};
module.exports = PerfSonar;
