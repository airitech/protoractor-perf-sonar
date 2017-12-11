const PerfSonar = require('../../index');

describe('angularjs todo test', function() {
  it('until show', function() {
    var perfSonar = new PerfSonar.sonar(browser);
    browser.get('http://todomvc.com/examples/angularjs_require/#/');

    browser.waitForAngular();

    perfSonar.untilShow('#footer');

    browser.sleep(2000);

    element(by.id('new-todo')).sendKeys('追加タスク');
    browser.actions().sendKeys(protractor.Key.ENTER).perform();

    browser.sleep(1000);

    // You wrote your first test, cross it off the list
    perfSonar.end().then(function(measureTime) {
      console.log('性能計測結果:' + measureTime);
    });
  });

  it('until hide', function() {
    var perfSonar = new PerfSonar.sonar(browser);
    browser.get('http://todomvc.com/examples/angularjs_require/#/');

    browser.waitForAngular();

    perfSonar.untilHide('.toggle.ng-pristine.ng-untouched');

    browser.sleep(2000);

    element(by.id('toggle-all')).click();
    element(by.css('#filters li:nth-child(2) a')).click();

    browser.sleep(1000);

    // You wrote your first test, cross it off the list
    perfSonar.end().then(function(measureTime) {
      console.log('性能計測結果:' + measureTime);
    });
  });
});