API, REST e RESTFULL

- Cliente (client)
- Garçon (Recebe o pedido do cliente e busca na cozinha e entrega ao cliente) (API)
- Cozinha (server)

## Rest
- Limpo
- Bom atendimento
- Que entregue o que se pede

Transferência de dados usando HTTP

## Restfull
- Cliente-Server: Cliente separado do servidor
- Stateless: Cada pedido tem que saber quem foi que pediu, então todos os pedidos
devem ter todas as informações necessárias para que o servidor possa entender e responder(RESPONSE)
a requisição(REQUEST). Usar token no lugar de session 
- Cacheable: A resposta(RESPONSE) da requisição(REQUEST) deve ser clara se o cliente pode guardar os dados da resposta(RESPONSE) em cache
- Layered System: Cliente nao pode perceber a complexidade. Interface simples.
