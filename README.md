# Sistema Gerenciador de Senhas
- Quer testar ? [dev-passwords
](https://senhas.devteixeira.com.br/)
### Andamento do Projeto:

-   [ ] Desenvolvimento
-   [x] Finalizado

## Requisitos

-   MySql
-   PHP >= 8.1
-   Composer
-   NodeJs >= 16.15

## Como rodar o projeto:

-   Clone o projeto para sua maquina

-   Instalar dependencias

```
composer install
```

```
npm install
```

-   copie o arquivo **".env.example"** e crie um **".env"**

-   Crie o seu Banco de Dados, ex: **"dev-password"**
-   Coloque suas configurações de Banco de Dados no `.env`
-   Coloque suas configurações de envio email no `.env`, se você não possui uma hospedagem para disparar emails use o [mailtrap](https://mailtrap.io/) que é gratuito para testes de envio de email

-   Criar as tabelas do Banco de Dados

```
php artisan migrate
```

-   Popular o banco de dados com dados fictícios

```
php artisan db:seed
```

-   Rodar o projeto

```
php artisan key:generate
```

```
npm run build
```

```
php artisan serve
```

-   Acesse a url que ira aparecer no seu terminal
