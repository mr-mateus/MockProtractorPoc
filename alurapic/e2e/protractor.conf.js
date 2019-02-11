// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const {
  SpecReporter
} = require('jasmine-spec-reporter');

var HtmlReporter = require('protractor-beautiful-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  handlesAlerts: true,
  specs: [
    './src/**/*.e2e-spec.ts'
  ],
  capabilities: {

    'browserName': 'chrome',
    'chromeOptions': {
      args: ['--headless', '--disable-gpu']
    }
  },
  /*
    firefox quebra muito os testes
    multiCapabilities: [{
        'browserName': 'firefox',
        marionette: false,
        version: '47.0.1',

        'moz:firefoxOptions': {
          args: ["--headless"]
        }
    } ,
      {
        'browserName': 'chrome',
        'chromeOptions': {
          args: ['--headless', '--disable-gpu']
        }
      }
  ],*/
  seleniumAddress: 'http://localhost:4444/wd/hub',
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: () => {}
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json')
    });
    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: true
      }
    }));
    jasmine.getEnv().addReporter(new HtmlReporter({
      baseDirectory: 'tmp/screenshots'
    }).getJasmine2Reporter());
  },
  SELENIUM_PROMISE_MANAGER: false
};
