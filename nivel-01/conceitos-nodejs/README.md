# Oque é nodejs?

[x] Javascript no back-end.
 * Não lidamos com eventos do usuário final.
 * Rotas e integrações.
- Plataforma (não é uma linguagem).
- Construída em cima da v8 do Google.
- Comparável a PHP/Ruby/Python etc...

# Oque é NPM?
 * Instalar bibliotecas de terceiros.
 * Fornecer bibliotecas.

# Características do Node.

Arquitetura Event-loop
 * baseada em eventos (rotas na maioria das vezes).
 * Call Stack.
 * Single-thread.
 * Non-blocking I/O.

# API Rest.

Como funciona?

* Fluxo da requisição e resposta.
  * Requisição feita por um cliente;
  * Resposta retornada através de uma estrutura de dados;
  * Cliente recebe resposra e processa resultado.
* As rotas utilizam os métodos HTTP;
GET, POST, PUT, DELETE.

* Benefícios:
  [x] Múltiplos clientes.
  [x]Protocolo de comunicação padronizado.
    * Mesma estrutura para web/ mobile/ API pública.
    * Comunicação com serviços externos.

- Estrutura JSON (Javascript Object Notation).

# Mêtodos HTTP

[x] GET: Buscar informações do back-end.
[x] POST: Criar uma informação.
[x] PUT: Alterar uma ou varias informação.
[x] PATCH: Alterar uma informação específica.
[x] DELETE: Deletar uma informação.

## Tipos de Parâmetros:

[x] Query Params: Filtros e paginação. ex: http://localhost:3333/projects?title=React&owner=Andrew

[x] Route Params: Identificar recursos 

[x] Request Body: Conteúdo para criar ou editar. ex: formulário. (JSON).