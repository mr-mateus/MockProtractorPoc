import { browser, protractor } from 'protractor';
import { SignupPage } from './pages/signup.po';
import { mockResponseWithDefaultHeaders, resetAllRequests } from './utils/mockServerClientUtil';

const requestMatcherUserExist = {
  'method': 'GET',
  'path': '/user/exists.*'
};

const requestMatcherUserSignup = {
  'method': 'POST',
  'path': '/user/signup'
};

let signupPage: SignupPage;
describe('SignupPage', () => {
  beforeEach(async () => {
    await resetAllRequests();
    signupPage = new SignupPage();
    await signupPage.navigateTo();
  });

  it(`Quando informar um formulário inválido, deve apresentar mensagens
    de erro e não permitir submeter o formulário`, async () => {
      await signupPage.getEmailElement().sendKeys(protractor.Key.TAB);
      await signupPage.getFullNameElement().sendKeys(protractor.Key.TAB);
      await signupPage.getUserNameElement().sendKeys(protractor.Key.TAB);
      await signupPage.getPasswordElement().sendKeys(protractor.Key.TAB);
      await signupPage.getButtonElement().click();
      expect(await signupPage.getMessageEmailIsRequiredElement().getText()).toEqual('Email is required!');
      expect(await signupPage.getMessageFullNameIsRequiredElement().getText()).toEqual('Full name is required!');
      expect(await signupPage.getMessageUserNameIsRequiredElement().getText()).toEqual('User name is required!');
      expect(await signupPage.getMessagePasswordIsRequiredElement().getText()).toEqual('Password is required!');
      expect(await browser.getCurrentUrl()).toEqual(`${browser.baseUrl}#/home/signup`);
    });

  it(`Quando informar um formulário válido, deve registrar o
    usuário e redirecionar para a página de Sign In`, async () => {
      const responseUserNotExist = {
        'statusCode': 200,
        'body': JSON.stringify(false)
      };

      await mockResponseWithDefaultHeaders(requestMatcherUserExist, responseUserNotExist);

      const responseUserSignup = {
        'statusCode': 201,
        'body': JSON.stringify({ 'email': 'teste@teste', 'fullName': 'teste', 'userName': '1231231', 'password': 'teste123123' })
      };
      await mockResponseWithDefaultHeaders(requestMatcherUserSignup, responseUserSignup);

      await signupPage.getEmailElement().sendKeys('totvs@totvs.com.br');
      await signupPage.getFullNameElement().sendKeys('Totvs SA');
      await signupPage.getUserNameElement().sendKeys('totvs');

      browser.sleep(700); /*Aguarda o tempo configurado para esperar usuário digistar antes de enviar para o servidor*/
      expect(await signupPage.getMessageUserAvailableElement().isDisplayed()).toBeTruthy();

      await signupPage.getPasswordElement().sendKeys('totvs@123');

      await signupPage.getButtonElement().click();

      expect(await browser.getCurrentUrl()).toEqual(`${browser.baseUrl}#/home`);
    });

  it(`Quando informar o nome de usuário que já exista, deve mostrar mensagme de erro e não permitir registrar`, async () => {
    const responseUserExist = {
      'statusCode': 200,
      'body': JSON.stringify(true)
    };

    await mockResponseWithDefaultHeaders(requestMatcherUserExist, responseUserExist);

    await signupPage.getEmailElement().sendKeys('totvs@totvs.com.br');
    await signupPage.getFullNameElement().sendKeys('Totvs SA');
    await signupPage.getUserNameElement().sendKeys('totvs');
    await signupPage.getPasswordElement().sendKeys('totvs@123');

    browser.sleep(400); /*Aguarda o tempo configurado para esperar usuário digistar antes de enviar para o servidor*/
    expect(await signupPage.getMessageUserNameAlredyTakenElement().isDisplayed()).toBeTruthy();
    expect(await signupPage.getButtonElement().isEnabled()).toBeFalsy();

    await signupPage.getButtonElement().click();
    expect(await browser.getCurrentUrl()).toEqual(`${browser.baseUrl}#/home/signup`);

  });

  it(`Quando o usuário clicar em 'Sign In' deve redirecionar para o login`, async () => {
    await signupPage.getLinkSingInElement().click();
    expect(await browser.getCurrentUrl()).toEqual(`${browser.baseUrl}#/home`);
  });
});
