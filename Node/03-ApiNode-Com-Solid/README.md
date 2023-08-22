# App

GymPass style app.

## RFs (Requisitos funcionais)

- [X] Deve ser possível se cadastrar
- [X] Deve ser possível se autenticar
- [X] Deve ser possível obter o perfil de um usuário logado
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado
- [ ] Deve ser possível o usuário obter seu histórico de check-ins
- [ ] Deve ser possível o usuário buscar academias próximas
- [ ] Deve ser possível o usuário buscar academias pelo nome
- [ ] Deve ser possível o usuário realizar check-in em uma academia
- [ ] Deve ser possível o usuário validar o check-in de um usuário
- [ ] Deve ser possível cadastrar uma academia

## RNs (Regra de negócio)

- [X] O usuário não deve poder se cadastrar com um e-mail duplicado
- [ ] O usuário não pode fazer 2 check-ins no mesmo dia
- [ ] O usuário não pode fazer check-in se não estiver perto (100m) da academia
- [ ] O check-in só poder validado até 20 minutos após criado
- [ ] O check-in só poder validado por administradores
- [ ] A academia só poder ser cadastrada por administradores


## RNFs (Requisitos não-funcionais)

- [X] A senha do usuário precisa estar criptografada
- [X] Os dados da aplicação precisam estar persistido em um banco PostgresSql
- [ ] Todas as listas de dados precisam estar paginadas com 20 itens por página
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token)