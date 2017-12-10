exports.config = {
  directConnect: true,
  chromeOnly: true,
  capabilities: {
    'browserName': 'chrome'
  },
  allScriptsTimeout: 11000,
  baseUrl: 'http://localhost:9001',
  specs: [
    './spec/**/*.spec.js'
  ],
  framework: 'jasmine'
};
