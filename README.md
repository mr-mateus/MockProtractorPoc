# MockProtractorPoc

MockProtractorPoc é o estudo da utilização do `Protractor` com um servidor mocado. Foi utilizado `mockserver-node` para o backend e `mockserver-client` aliado aos scripts de teste, para interagir com o servidor **Mock** inserindo ``Request Matchers*`` suas `Responses`
> `*` `RequestMatcher` é uma espécie de **"regex"** que o mockserver-node espera para responder com uma determinada ação (`Response`)

## Começando
Essas instruções mostraram rodar os testes e2e do projeto `alurapic` utilizando `Protractor` e o `mockserver-node`

## Pré-requisitos
Preste atenção nas coisas que você precisa instalar antes de sair executando o projeto ;) 

**Tenha certeza que você possui o `Node.js >= 8.0` e `NPM` >= 5 instalados, caso não possua ->** https://nodejs.org/dist/v10.15.1/node-v10.15.1-x64.msi
**Necessário ter o java >=7 instalado tambem**

```bash
# clone o projeto
git clone https://github.com/mr-mateus/MockProtractorPoc.git

# mude o diretório para o nosso 
cd MockProtractorPoc

# instale o angular global 
npm install -g angular 

# instale o protractor global 
npm install -g protractor 

# instale o webdriver-manager global
npm install -g webdriver-manager 

# entre na pasta do projeto Angular alurapic e instale as dependências
cd alurapic 
npm i

# entre na pasta do run_mockserver e instale as dependências
cd ..\run_mockserver
npm i
```
# Passo a Passo
## #1 Rodando o projeto angular

```bash
# entre na pasta alurapic
cd alurapic 
# inicie o build live-reload do projeto pelo Angular CLI
ng serve
# entre no endereço http://localhost:4200/
```

## #2 Subindo o webdriver-manager 
```bash
# como boa prática, antes subir o webdrive-manager é importante atualizar os drivers dos navegadores
webdriver-manager update

# inicialize o webdriver-manager
webdriver-manager start
# acesso endereço http://localhost:4444/wd/hub
```

## #3 Subindo o mockserver-node
```bash
# entre na pasta do projeto mock server
cd run_mockserver

# inicialize o servidro mock
npm start 
# o servidor mock está configurado para subir na porta 1080, caso precise mudar entre no arquivo `server.js` e mude a porta **`1080`** para a sua porta favorita :)
```

## Rode os testes
```bash
# entre na pasta onde os testes estão configurados
cd alurapic\e2e 
protractor protractor.conf.js
```
** o projeto está configurado para utilizar um plugin do protractor chamado ```protractor-beautiful-reporter```, com esse plugin após a execução dos testes, o resultado fica disponível em `\alurapic\tmp\screenshots\report.html`
>  