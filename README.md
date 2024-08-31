# Teste-Shopper-backend

## Descrição

Este repositório contém a solução para o Teste Técnico Back End – Desenvolvimento Web da Shopper.com.br. O objetivo é desenvolver um serviço de leitura de imagens para medir o consumo de água e gás.

## Estrutura do Projeto

O projeto foi desenvolvido para implementar um serviço back-end com os seguintes requisitos:

- **Desenvolvimento de uma API REST** usando Node.js com TypeScript.
- **Integração com a API do Google Gemini** para leitura de imagens.
- **Utilização de Docker** para criação e gerenciamento de containers.
- **Modelagem básica de banco de dados**.

## Como Executar o Projeto

Para executar o projeto, siga os passos abaixo:

1. Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina.
2. Clone o repositório para sua máquina local.
3. Navegue até a pasta do projeto no terminal.
4. Obtenha uma chave de acesso gratuita do Google Gemini:
   - [Obter chave de API](https://ai.google.dev/gemini-api/docs/api-key)
5. Crie um arquivo chamado .env na raiz do projeto e adicione a seguinte linha:

   ```
   GEMINI_API_KEY=sua_chave_aqui
   ```

6. Execute o comando para iniciar os containers:

   ```bash
   docker-compose up --build
   ```

7. Aguarde até que todos os serviços estejam prontos e em execução.
8. Uma vez que o servidor esteja rodando, a API estará disponível no endereço base:

   ```
   http://localhost:4000/
   ```

## Endpoints da API

A API possui os seguintes endpoints principais:

### 1. GET /health

Endpoint para verificar a saúde da aplicação. Retorna apenas Status Code 200, para indicar que o projeto está funcionando.

**Response Body:**

```json
{
 "ok!"
}
```

### 2. POST /measure

Endpoint para enviar e analisar imagens de medidores.

**Request Body:**

```bash
{
  "image": "base64",
  "customer_code": "string",
  "measure_datetime": "datetime",
  "measure_type": "WATER" || "GAS"
}
```

**Response Body:**

Status Code 200 - Operação realizada com sucesso

```json
{
  "image_url": "string",
  "measure_value": "integer",
  "measure_uuid": "string"
}
```

Status Code 400 - Dados inválidos

```bash
{
  "error_code": "INVALID_DATA",
  "error_description": "<descrição do erro>"
}
```
A descrição do erro avisa qual parametro do body é invalido


Status Code 409 - Leitura duplicada

```json
{
  "error_code": "DOUBLE_REPORT",
  "error_description": "Leitura do mês já realizada"
}
```

### 3. PATCH /confirm

Endpoint para confirmar ou corrigir o valor lido pelo LLM.

**Request Body:**

```json
{
  "measure_uuid": "string",
  "confirmed_value": "integer"
}
```

**Response Body:**

Status Code 200 - Operação realizada com sucesso

```json
{
  "success": true
}
```

Status Code 400 - Dados inválidos

```bash
{
  "error_code": "INVALID_DATA",
  "error_description": "<descrição do erro>"
}
```
A descrição do erro avisa qual parametro do body é invalido

Status Code 404 - Leitura não encontrada

```json
{
  "error_code": "MEASURE_NOT_FOUND",
  "error_description": "Leitura não encontrada"
}
```

Status Code 409 - Leitura já confirmada

```json
{
  "error_code": "CONFIRMATION_DUPLICATE",
  "error_description": "Leitura já confirmada"
}
```

### 4. GET /<customer_code>/list

Endpoint para listar as medidas realizadas por um determinado cliente.

Parâmetro opcional: ?measure_type=WATER ou ?measure_type=GAS (case insensitive)

**Response Body:**

Status Code 200 - Operação realizada com sucesso

```json
{
  "customer_code": "string",
  "measures": [
    {
      "measure_uuid": "string",
      "measure_datetime": "datetime",
      "measure_type": "string",
      "has_confirmed": "boolean",
      "image_url": "string"
    }
  ]
}
```

Status Code 400 - Tipo de medição inválido

```json
{
  "error_code": "INVALID_TYPE",
  "error_description": "Tipo de medição não permitida"
}
```

Status Code 404 - Nenhum registro encontrado

```json
{
  "error_code": "MEASURES_NOT_FOUND",
  "error_description": "Nenhuma leitura encontrada"
}
```

## Documentação

## Documentação

Aqui estão algumas documentações importantes para as tecnologias utilizadas:

- **Google Gemini:** https://ai.google.dev/gemini-api/docs/vision
- **Node.js:** https://nodejs.org/en/docs/
- **TypeScript:** https://www.typescriptlang.org/docs/
- **Express:** https://expressjs.com/
- **Joi:** https://joi.dev/api/
- **PostgresSQL:** https://www.postgresql.org/docs/
- **Prisma:** https://www.prisma.io/docs
  - Guia de início do zero: [Link](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgres)
  - Extensão VS Code: [Link](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma)
- **Docker**: https://docs.docker.com/
  - Extensão VS Code: [Link](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)


Essas documentações oficiais são excelentes recursos para aprender e consultar enquanto você trabalha com essas tecnologias.
