# React, React-dom e React Native

**React**: É o framework.

**React-dom**: Éa integração do react com a **DOM**.


# Babel & Webpack

**Babel converte o código JS para uma versão que o browser entenda** 

**Webpack possui várias funções**
  * Criação do bundle. 
  * Ensina ao JS como importar CSS, img e etc...
  * Live reload.

## Dependências:

```
  yarn add @babel/cli
  yarn add @babel/core
  yarn add @babel/preset-env
  yarn add @babel/preset-react
  yarn add webpack
  yarn add webpack-cli
  yarn add webpack-dev-server -D

```

# Babel:
  Criar na raíz do projeto o arquivo 'babel.config.js'. 

  Executar o babel: yarn babel src/nomearquivo.js --out-file public/bundle.js

  **out-file**: vai mover a transpilação para outro lugar.

# Webpack:
  Criar na raíz do projeto o arquivo webpack.config.js
  