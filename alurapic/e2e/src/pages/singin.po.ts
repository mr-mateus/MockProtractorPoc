import { browser, by, element, ElementFinder } from 'protractor';

export class SinginPage {
  public userName: ElementFinder;
  public password: ElementFinder;
  public messageNameIsRequired: ElementFinder;
  public messagePasswordIsRequired: ElementFinder;
  public button: ElementFinder;
  public linkRegisterNow: ElementFinder;
  constructor() {
    this.userName = element(by.css('input[formcontrolname=userName]'));
    this.password = element(by.css('input[formcontrolname=password]'));
    this.messageNameIsRequired = element.all(by.css('ap-vmessage small')).get(0);
    this.messagePasswordIsRequired = element.all(by.css('ap-vmessage')).get(1);
    this.button = element(by.css('button'));
    this.linkRegisterNow = element(by.css('[href="#/home/signup"]'));
  }
  async navigateTo() {
    return browser.get('/home');
  }
}
