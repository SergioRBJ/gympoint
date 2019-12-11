# gym-point

Aplicação completa desenvolvida usando ecossistema JavaScript para administração de academia.

* [Backend - Node.js](#backend---node.js)

## Backend - Node.js

### Instalação de requisitos
1. [Node](https://nodejs.org/en/download/package-manager/) &rarr; recomendo a instalação via package manager.
2. [Yarn](https://yarnpkg.com/lang/en/)(opcional) &rarr; gerenciador de pacotes mais performático e intuitivo.
3. [Docker](https://www.docker.com/get-started)(opcional) &rarr; usado para a criação de ambientes isolados. Você pode usa-lo na criação dos servidores que usaremos para teste.

### Configuração dos servidores

Iremos configurar os servidores que usaremos nesta aplicação que são:

1. [Postgres](https://www.postgresql.org/) &rarr; armazenará os dados estruturados.
2. [MongoDB](https://www.mongodb.com) &rarr; armazenará os dados não estruturados e que necessitam ser performáticos.
3. [Redis](https://redis.io/) &rarr; armazenará os jobs que serão executados em background. Neste caso usaremos ele para armazenar os jobs de envio de e-mails.

Caso você não opte por usar o Docker para criação dos servidores(mongodb, redis, postgre) pule esta parte.

Para a criação dos servidores usaremos o docker compose, um recurso que nos ajuda na configuração e criação dos ambientes de uma só vez. Neste caso usaremos somente para uma melhor organização, já que não precisamos faze-los conversarem entre si.

Com o Docker iniciado, abra o prompt/terminal e execute o comando abaixo:

```shell
    docker-compose up -d
```

Este comando irá criar as três imagens à partir do arquivo ```docker-compose.yml```.

