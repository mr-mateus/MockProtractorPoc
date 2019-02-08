import { browser, by, element, ElementFinder } from 'protractor';

export class SignupPage {
  constructor() {
  }

  async navigateTo(): Promise<any> {
    return browser.get(`${browser.baseUrl}#/home/signup`);
  }

  public getEmailElement(): ElementFinder {
    return element(by.css('input[formcontrolname=email]'));
  }

  public getFullNameElement(): ElementFinder {
    return element(by.css('input[formcontrolname=fullName]'));
  }
  public getUserNameElement(): ElementFinder {
    return element(by.css('input[formcontrolname=userName]'));
  }

  public getPasswordElement(): ElementFinder {
    return element(by.css('input[formcontrolname=password]'));
  }

  public getMessageEmailIsRequiredElement(): ElementFinder {
    return element(by.css('#messageEmailIsRequired'));
  }
  public getMessageFullNameIsRequiredElement(): ElementFinder {
    return element(by.css('#messageFullNameIsRequired'));
  }

  public getMessageUserNameIsRequiredElement() {
    return element(by.css('#messageUserNameIsRequired'));
  }

  public getMessagePasswordIsRequiredElement() {
    return element(by.css('#messagePasswordIsRequired'));
  }

  public getButtonElement(): ElementFinder {
    return element(by.css('button'));
  }

  public getLinkSingInElement(): ElementFinder {
    return element(by.css('[href="#/"]'));
  }

  public getMessageUserAvailableElement(): ElementFinder {
    return element(by.css('#messageUserAvailable'));
  }

  public getMessageUserNameAlredyTakenElement(): ElementFinder{
    return element(by.css('#messageUserNameAlredyTaken'));
  }


}
