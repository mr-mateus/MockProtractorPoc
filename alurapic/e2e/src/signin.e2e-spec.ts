import { SinginPage } from './pages/singin.po';
import { browser, element, by } from 'protractor';
import { mockResponseWithHeaders, mockResponseWithDefaultHeaders, resetAllRequests } from './utils/mockServerClientUtil';

let singinPage: SinginPage;

const requestMatcherLogin = {
  'method': 'POST',
  'path': '/user/login'
};

const requestMatcherPhotos = {
  'method': 'GET',
  'path': '/flavio/photos',
  'queryStringParameters': {
    'page': ['1']
  }
};

describe('SinginPage', () => {
  beforeEach(async () => {
    await resetAllRequests();
    singinPage = new SinginPage();
    await singinPage.navigateTo();
  });

  afterEach(async () => {
    await browser.executeScript('window.localStorage.clear();');
  });

  it(`Quando o usuário não preencher o formulário -
    Deve apresentar mensagem de erro e o botão login deve estar desabilitado`, async () => {
      expect(await singinPage.messageNameIsRequired.getText()).toEqual('User name is required!');
      expect(await singinPage.messagePasswordIsRequired.getText()).toEqual('Password is required!');
      expect(await singinPage.button.isEnabled()).toBeFalsy();
    });

  it(`Quando o usuário informar credencial inválida -
    Deve apresentar mensagem de erro para o usuário e limpar o formulário`, async () => {
      const responseErrorLogin = {
        'statusCode': 401
      };

      await mockResponseWithDefaultHeaders(requestMatcherLogin, responseErrorLogin);

      await singinPage.userName.sendKeys('flavio');
      await singinPage.password.sendKeys('1234');

      await singinPage.button.click();

      await browser.sleep(50);
      const alertMessage = await browser.switchTo().alert().getText();
      await browser.switchTo().alert().accept();

      expect(alertMessage).toEqual('Invalid user name or password');
      expect(await singinPage.userName.getText()).toEqual('');
      expect(await singinPage.password.getText()).toEqual('');
      expect(await singinPage.button.isEnabled()).toBeFalsy();
    });

  it(`Quando o usuário informar credencial válida -
    Redirecionar para a página com o seu usuário`, async () => {
      const authenticatedAccountHeader = [
        {
          'name': 'x-access-token',
          // tslint:disable-next-line:max-line-length
          'values': ['eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImZsYXZpbyIsImVtYWlsIjoiZmxhdmlvQGFsdXJhcGljLmNvbS5iciIsImlhdCI6MTU0OTQ3MDA2MCwiZXhwIjoxNTQ5NTU2NDYwfQ.bWU5uB_iu-5l2sh3P9O7H_j6rpvFeOSFl91mK2qpwJ4']
        }
      ];

      const responseSuccessLogin = {
        'statusCode': 200,
        'body': JSON.stringify({
          'id': 1,
          'name': 'flavio',
          'email': 'flavio@alurapic.com.br'
        })
      };

      await mockResponseWithHeaders(requestMatcherLogin, responseSuccessLogin, authenticatedAccountHeader);

      const responseSuccessPhotos = {
        'statusCode': 200,
        'body': JSON.stringify([
          {
            'id': '14',
            'postDate': '2018-04-12T20:27:17.161Z',
            'url': 'data:image/jpeg;base64,teste'
          }])
      };
      await mockResponseWithHeaders(requestMatcherPhotos, responseSuccessPhotos, authenticatedAccountHeader);

      await singinPage.userName.sendKeys('flavio');
      await singinPage.password.sendKeys('123');

      await singinPage.button.click();

      expect(await browser.getCurrentUrl()).toEqual(`${browser.baseUrl}#/user/flavio`);
    });


  it(`Deve redirecionar para a a página de SingnUp`, async () => {
    await singinPage.linkRegisterNow.click();
    expect(await browser.getCurrentUrl()).toEqual(`${browser.baseUrl}#/home/signup`);
  });
});
