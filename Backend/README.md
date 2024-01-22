# Backend

Desenvolvido utilizando [Node.js](https://nodejs.org/en), [Hono](https://hono.dev/) e [PostgreSQL](https://www.postgresql.org/).

## Requisitos

- [Node.js](https://nodejs.org/en)
- [PostgreSQL](https://www.postgresql.org/)

## Recomendações

- [pnpm](https://pnpm.io/)  
Um gerenciador de pacotes rápido e que otimiza o espaço ocupado pelas dependências do projeto.

## Como rodar

Após certificar-se de que os requisitos foram cumpridos, verifique se o banco de dados está rodando.
O projeto foi feito utilizando `pnpm`, mas pode rodar também com `npm` (npm já vem instalado junto com o Node.js):  
Dentro da pasta backend, siga os passos (rodando os comandos em um terminal):

1. Instale as dependências do projeto:  
    Com pnpm:  
    `pnpm install`  

    Com npm:  
    `npm install`

2. Configure o arquivo `.env`:  
    Um arquivo `.env` já está criado na pasta `frontend`, contendo as seguintes variáveis:  
    `DATABASE_URL` e `PORT`, que são respectivamente, a URL de conexão do banco e a porta em que o servidor irá rodar.  
    Na configuração padrão, o banco estará rodando na porta 5432, no usuário postgres, com senha postgres e database postgres. O servidor rodará na porta 8080.
    Altere de acordo com a configuração de seu banco e porta desejada.

3. Rode o servidor:  
    Com pnpm:  
    `pnpm run dev`  

    Com npm:  
    `npm run dev`

Pronto, em caso de sucesso, o servidor estará rodando na porta configurada e já pode ser utilizado.
  