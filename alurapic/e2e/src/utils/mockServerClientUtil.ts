const mockServerClient = require('mockserver-client').mockServerClient;

export function mockResponseWithDefaultHeaders(request, response): Promise<boolean> {
  return mockServerClient('localhost', 1080).mockAnyResponse({
    'httpRequest': request,
    'httpResponse': response
  }).then(() => {
    console.log('Criado mockResponseWithDefaultHeaders');
    return new Promise<boolean>((resolve) => {
      resolve(true);
    });
  }, (error) => {
    console.log('Algo deu errado - mockResponseWithDefaultHeaders', error);
    return new Promise<boolean>((resolve, reject) => {
      reject(false);
    });
  });
}

export function mockResponseWithHeaders(request, response, headers): Promise<boolean> {
  return mockServerClient('localhost', 1080).setDefaultHeaders(headers).mockAnyResponse({
    'httpRequest': request,
    'httpResponse': response
  }).then(() => {
    console.log('Criado mockResponseWithHeaders');
    return new Promise<boolean>((resolve) => {
      resolve(true);
    });
  }, (error) => {
    console.log('Algo deu errado - mockResponseWithHeaders', error);
    return new Promise<boolean>((resolve, reject) => {
      reject(false);
    });
  });
}

export function resetAllRequests(): Promise<boolean> {
  return mockServerClient('localhost', 1080)
    .reset().then(() => {
      console.log('Mock limpo - resetAllRequests feito com sucesso');

      return new Promise<boolean>((resolve, reject) => {
        resolve(true);
      });
    }, (error) => {
      console.log('Algo deu errado - resetAllRequests', error);
      return new Promise<boolean>((resolve, reject) => {
        reject(false);
      });

    });
}

