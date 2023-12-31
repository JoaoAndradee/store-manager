const express = require('express');
// Meu código
const { productRouter } = require('./routers');
const { salesRouter } = require('./routers');
//

// Inicio do projeto

const app = express();

// Meu código
app.use(express.json());

app.use('/products', productRouter);
app.use('/sales', salesRouter);
//

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação
module.exports = app;
