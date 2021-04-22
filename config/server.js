// passo 3 - importar o modulo do framework express
var express = require('express');

// passo 4 - importar o modulo do consign
var consign = require('consign');

// passo 5 - importar modulo do body-parser
var bodyParser = require('body-parser');

// passo 6 - importar modulo express-validator
var expressValidator = require('express-validator');

// passo 7 - iniciar o objeto do express
var app = express();


// passo 9 - setar as variaveis 'view engine' e 'views' do express
app.set('view engine', 'ejs');
app.set('views', './app/views');

// passo 10 - configurar o middleware arquivos estaticos express.static
app.use(express.static('./app/public'));


// passo 11 -  configurar o middleware body-parser
app.use(bodyParser.urlencoded({extended: true}));

// passo 12 - configurar o middleware express-validator;
app.use(expressValidator());

// passo 13 - configurar o consign para fazer autoload das rotas e do models e dos controllers para o objeto app
consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app);


//passo 8 - exportar modulo do objeto app
module.exports = app;
