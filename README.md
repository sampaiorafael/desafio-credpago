# Desafio - Credpago

# Iniciando

## Instalação
```bash
$ npm install
```

## Variaveis de desenvolvimento necessárias
```bash
PORT=8080
DATABASE_HOST = localhost
DATABASE_PORT = 5432
DATABASE_USERNAME = root
DATABASE_PASSWORD = development
DATABASE_SCHEMA = desafio-credpago
```

## Subindo banco de desenvolvimento
```bash
$ docker-compose up -d
```

## Configurando banco para desenvolvimento (mirgations) 
```bash
$ npm run setup:dev
```

## Iniciando em desenvolvimento/watch mode
```bash
$ npm run start:dev
```

## Rodando testes
```bash
$ npm run test
$ npm run test:watch
```

## Documentação Swagger
```
http://localhost:8080/docs
```