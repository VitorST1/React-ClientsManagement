# Frontend

Desenvolvido utilizando [Vite](https://vitejs.dev/), [React](https://reactjs.org/), [TanStack Query](https://tanstack.com/query/latest) e [TailwindCSS](https://tailwindcss.com/).

## Requisitos

- [Node.js](https://nodejs.org/en)

## Recomendações

- [pnpm](https://pnpm.io/)  
Um gerenciador de pacotes rápido e que otimiza o espaço ocupado pelas dependências do projeto.

## Como rodar

O projeto foi feito utilizando `pnpm`, mas pode rodar também com `npm` (npm já vem instalado junto com o Node.js):  
Dentro da pasta frontend, siga os passos (rodando os comandos em um terminal):

1. Instale as dependências:  
    Com pnpm:  
    `pnpm install`  

    Com npm:  
    `npm install`

2. Configure o arquivo `.env`:  
    Um arquivo `.env` já está criado na pasta `frontend`, contendo as seguintes variáveis:  
    `VITE_BASEURL` e `VITE_PORT`, que são respectivamente, a URL base e a porta do servidor.  
    Altere de acordo com a configuração de seu servidor.

3. Rode o projeto:  
    Com pnpm:  
    `pnpm run dev`  

    Com npm:  
    `npm run dev`

4. Acesse a URL:  
    Após rodar o projeto, em caso de sucesso, a URL de acesso ao frontend aparecerá no terminal.  
    Geralmente o projeto é iniciado na porta 5173, porém, pode mudar caso a porta esteja ocupada.  
    Ex.: `http://localhost:5173`
  