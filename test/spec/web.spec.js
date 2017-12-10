const PerfSonar = require('../../index');

describe('angularjs homepage test', function() {
  it('until show', function() {
    var perfSonar = new PerfSonar.sonar(browser);
    browser.get('https://docs.angularjs.org/tutorial/step_00');

    browser.waitForAngular();

    perfSonar.untilShow('.alert.alert-info');

    element(by.css('.nav-index-group .nav-index-listing:nth-child(2) a')).click();

    // You wrote your first test, cross it off the list
    perfSonar.end().then(function(measureTime) {
      console.log('性能計測結果:' + measureTime);
    });
  });

  it('until hide', function() {
    var perfSonar = new PerfSonar.sonar(browser);
    browser.get('https://docs.angularjs.org/tutorial/step_01');

    browser.waitForAngular();

    perfSonar.untilHide('.alert.alert-info');

    browser.sleep(1000);

    element(by.css('.nav-index-group .nav-index-listing:nth-child(1) a')).click();

    // You wrote your first test, cross it off the list
    perfSonar.end().then(function(measureTime) {
      console.log('性能計測結果:' + measureTime);
    });
  });
});