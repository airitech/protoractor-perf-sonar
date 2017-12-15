const PerfSonar = require('../../index');
const ALLOW_TIME = 500;

describe('angularjs homepage test', function () {
  var origineTimeShow = null;
  it('until show', function () {
    var perfSonar = new PerfSonar.sonar(browser);
    browser.get('https://docs.angularjs.org/tutorial/step_00');

    browser.waitForAngular();

    perfSonar.untilShow('.alert.alert-info');

    browser.sleep(1000);

    element(by.css('.nav-index-group .nav-index-listing:nth-child(2) a')).click();

    browser.sleep(1000);

    element(by.tagName("button")).click();

    // You wrote your first test, cross it off the list
    perfSonar.end().then(function (measureTime) {
      console.log('性能計測結果:' + measureTime);
      origineTimeShow = measureTime;
    });
  });

  it('until show', function () {
    var perfSonar = new PerfSonar.sonar(browser);
    browser.get('https://docs.angularjs.org/tutorial/step_00');

    browser.waitForAngular();

    perfSonar.untilShow('.alert.alert-info');

    browser.sleep(1000);

    element(by.css('.nav-index-group .nav-index-listing:nth-child(2) a')).click();

    browser.sleep(1000);

    element(by.tagName("button")).click();

    browser.sleep(1000);

    // You wrote your first test, cross it off the list
    perfSonar.end().then(function (measureTime) {
      console.log('性能計測結果:' + measureTime);
      expect(measureTime).toBeGreaterThan(origineTimeShow - ALLOW_TIME);
      expect(measureTime).toBeLessThan(origineTimeShow + ALLOW_TIME);
    });
  });

  it('until show 5s', function () {
    var perfSonar = new PerfSonar.sonar(browser);
    browser.get('https://docs.angularjs.org/tutorial/step_00');

    browser.waitForAngular();

    perfSonar.untilShow('.alert.alert-info');

    browser.sleep(1000);

    element(by.css('.nav-index-group .nav-index-listing:nth-child(2) a')).click();

    browser.sleep(5000);

    element(by.tagName("button")).click();

    // You wrote your first test, cross it off the list
    perfSonar.end().then(function (measureTime) {
      console.log('性能計測結果:' + measureTime);
      expect(measureTime).toBeGreaterThan(origineTimeShow + 4000 - ALLOW_TIME);
      expect(measureTime).toBeLessThan(origineTimeShow + 4000 + ALLOW_TIME);
    });
  });

  var origineTimeHide = null;
  it('until hide', function () {
    var perfSonar = new PerfSonar.sonar(browser);
    browser.get('https://docs.angularjs.org/tutorial/step_01');

    browser.waitForAngular();

    element(by.tagName("button")).click();

    perfSonar.untilHide('.alert.alert-info');

    browser.sleep(1000);

    element(by.css('.nav-index-group .nav-index-listing:nth-child(1) a')).click();

    // You wrote your first test, cross it off the list
    perfSonar.end().then(function (measureTime) {
      console.log('性能計測結果:' + measureTime);
      origineTimeHide = measureTime;
    });
  });

  it('until hide 5s', function () {
    var perfSonar = new PerfSonar.sonar(browser);
    browser.get('https://docs.angularjs.org/tutorial/step_01');

    browser.waitForAngular();

    element(by.tagName("button")).click();

    perfSonar.untilHide('.alert.alert-info');

    browser.sleep(6000);

    element(by.css('.nav-index-group .nav-index-listing:nth-child(1) a')).click();

    // You wrote your first test, cross it off the list
    perfSonar.end().then(function (measureTime) {
      console.log('性能計測結果:' + measureTime);
      expect(measureTime).toBeGreaterThan(origineTimeHide + 5000 - ALLOW_TIME);
      expect(measureTime).toBeLessThan(origineTimeHide + 5000 + ALLOW_TIME);
    });
  });
});